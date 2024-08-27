/**
 * Copyright 2023 Google LLC
 */

data "google_project" "project" {
}

##########################
##########################
# Part 1: Frontend Image #
##########################
##########################

resource "google_artifact_registry_repository" "frontend" {
  location      = var.region
  repository_id = "frontend"
  description   = "Managed by Terraform - Do not manually edit - frontend repository"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }

  lifecycle {
    ignore_changes = [ docker_config ]
  }
}

resource "google_cloudbuild_trigger" "frontend" {

  project     = var.project
  location    = var.region
  name        = "frontend-build"
  description = "Managed by Terraform - Do not manually edit - Frontend image build"
  # service_account = "projects/${var.project}/serviceAccounts/cloud-build-runner@${var.project}.iam.gserviceaccount.com"

  repository_event_config {
    repository = "projects/${var.project}/locations/${var.region}/connections/${var.gitlab-host-connection-name}/repositories/${var.repo}"
    push {
      branch = "main"
    }
  }

  included_files = ["frontend/**"]

  substitutions = {
    _PROJECT_ID_ = var.project
    _REGION_     = var.region
  }

  filename = "cloudbuild/frontend/cloudbuild.yaml"

}



###############
###############
# Part 2: IAP #
###############
###############

resource "google_project_service_identity" "iap" {
  provider = google-beta

  project = var.project
  service = "iap.googleapis.com"
}

resource "google_cloud_run_v2_service_iam_member" "iap-sa-invoker" {

  count = tobool(var.enable-domain) && tobool(var.enable-iap-on-domain) ? 1 : 0

  project = var.project
  location = google_cloud_run_v2_service.frontend-service.location
  name = google_cloud_run_v2_service.frontend-service.name
  role = "roles/run.invoker"
  member = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-iap.iam.gserviceaccount.com"

  depends_on = [google_project_service_identity.iap]
}

# resource "google_iap_brand" "project_brand" {

#   support_email     = "weekss@google.com"
#   application_title = var.frontend-subdomain-name
#   project           = var.project
# }

# resource "google_iap_client" "project_client" {

#   display_name = "${var.frontend-subdomain-name} client"
#   brand        =  google_iap_brand.project_brand.name
# }

locals {
  frontend-accessors-list = split(":", var.frontend-accessors)
}

resource "google_iap_web_iam_member" "frontend-access" {
  count = tobool(var.enable-iap-on-domain) ? length(local.frontend-accessors-list) : 0
  
  project  = var.project
  role     = "roles/iap.httpsResourceAccessor"
  member   = "user:${local.frontend-accessors-list[count.index]}"
}



#############################
#############################
# Part 3: Cloud Run service #
#############################
#############################

# Create the Service Account to use with the Cloud Run service
resource "google_service_account" "frontend-service-account" {
  account_id   = "frontend-cloud-run-sa"
  display_name = "Frontend Cloud Run SA"
  description  = "Service Account for the Frontend Cloud Run Service"
}

# Give the Service Account the Cloud Run Invoker role
resource "google_project_iam_member" "frontend-sa-cloud-run-invoker-role" {
  project = var.project
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.frontend-service-account.email}"
}

# Give the Service Account the Cloud Run Bigquery Job User role
resource "google_project_iam_member" "frontend-sa-bigquery-job-user-role" {
  project = var.project
  role    = "roles/bigquery.jobUser"
  member  = "serviceAccount:${google_service_account.frontend-service-account.email}"
}

# Give the Looker Service Account permissions to create short lived tokens for the Cloud Run service account so it can access BI dashboards
resource "google_service_account_iam_member" "act-as-cloud-run-sa-looker-sa" {
  service_account_id = google_service_account.frontend-service-account.name
  role               = "roles/iam.serviceAccountTokenCreator"
  member             = "serviceAccount:service-org-890391398170@gcp-sa-datastudio.iam.gserviceaccount.com"
}

# Give the Looker dashboard editors permission to act as the Cloud Run service account so it can edit looker dashboards via the frontend service account
resource "google_service_account_iam_member" "act-as-cloud-run-sa-weekss" {
  service_account_id = google_service_account.frontend-service-account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "user:weekss@google.com"
}

# Give the Looker dashboard editors permission to act as the Cloud Run service account so it can edit looker dashboards via the frontend service account
resource "google_service_account_iam_member" "act-as-cloud-run-sa-admin-altostrat" {
  service_account_id = google_service_account.frontend-service-account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "user:admin@weekss.altostrat.com"
}

# Give the Looker dashboard editors permission to act as the Cloud Run service account so it can edit looker dashboards via the frontend service account
resource "google_service_account_iam_member" "act-as-cloud-run-sa-vberv-ss" {
  service_account_id = google_service_account.frontend-service-account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "user:vberv@softserveinc.com"
}

# Give the Cloud Build Service Account permissions to act as the Cloud Run service account so it can deploy a revision to Cloud Run
resource "google_service_account_iam_member" "act-as-cloud-run-sa" {
  service_account_id = google_service_account.frontend-service-account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

# Create the Frontend Cloud Run service with a placeholder hello-world image
resource "google_cloud_run_v2_service" "frontend-service" {
  name     = "frontend"
  location = var.region
  ingress = tobool(var.enable-domain) ? "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER" : "INGRESS_TRAFFIC_ALL"
  template {
    labels = {
      managed-by = "terraform"
    } 
    scaling {
      min_instance_count = 1
      max_instance_count = 1
    }
    vpc_access {
      connector = var.vpc-access-connector-id
      egress = "ALL_TRAFFIC"
    }  
    timeout = "300s"
    service_account = google_service_account.frontend-service-account.email   
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      env {
        name  = "BACKEND_ENDPOINT"
        value = var.backend-service-uri
      } 
      env {
        name  = "APP_BRANDED"
        value = "GCP"
      }      
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu = "8",
          memory = "32Gi"
        }
      }
    }
    max_instance_request_concurrency = 80
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image
    ]
  }

  depends_on = [google_service_account_iam_member.act-as-cloud-run-sa]
}

# Allow the proxy Cloud Run service to run unauthenticated
data "google_iam_policy" "frontend-noauth" {

  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }

}

resource "google_cloud_run_service_iam_policy" "frontend-noauth" {

  location = google_cloud_run_v2_service.frontend-service.location
  project  = google_cloud_run_v2_service.frontend-service.project
  service  = google_cloud_run_v2_service.frontend-service.name

  policy_data = data.google_iam_policy.frontend-noauth.policy_data

  depends_on = [google_cloud_run_v2_service.frontend-service]
}

# Below is in the case of enable-domain=true, where we DO have a domain to attach the frontend to and therefore need a Serverless NEG, Backend Service, HTTP redirect FR, HTTP redirect proxy, HTTP redirect URL Map, HTTPS FR, HTTPS proxy, HTTPS URL Map #
# For the alternative case of enable-domain=false, we will simply use the default Cloud Run endpoint. 

# Create a Serverless NEG for the frontend Cloud Run service
resource "google_compute_region_network_endpoint_group" "neg-for-frontend" {

  count = tobool(var.enable-domain) ? 1 : 0

  name                  = "neg-for-${google_cloud_run_v2_service.frontend-service.name}"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = google_cloud_run_v2_service.frontend-service.name
  }
}

# Create a backend-service for the frontend LB
resource "google_compute_backend_service" "backend-service-for-frontend" {

  count = tobool(var.enable-domain) ? 1 : 0

  name        = "backend-service-for-${google_cloud_run_v2_service.frontend-service.name}"
  protocol    = "HTTP"
  port_name   = "http"
  timeout_sec = 30

  # dynamic "iap" {
  #   for_each = tobool(var.enable-iap-on-domain) ? ["this"] : []
    
  #   content {
  #     oauth2_client_id = google_iap_client.project_client.client_id
  #     oauth2_client_secret = google_iap_client.project_client.secret
  #   }
  # }

  backend {
    group = google_compute_region_network_endpoint_group.neg-for-frontend[0].id
  }

  lifecycle {
    ignore_changes = [
      iap,
    ]
  }

  
}


# Create an http redirect forwarding rule for the frontend
resource "google_compute_global_forwarding_rule" "http-redirect-lb-for-frontend" {
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name   = "http-redirect-lb-for-${google_cloud_run_v2_service.frontend-service.name}"

  target = google_compute_target_http_proxy.http-redirect-proxy-for-frontend[0].id
  port_range = "80"
  ip_address = var.frontend-external-ip
}

# Create a http redirect proxy for the the frontend
resource "google_compute_target_http_proxy" "http-redirect-proxy-for-frontend" {
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name       = "http-redirect-proxy-for-${google_cloud_run_v2_service.frontend-service.name}"
  url_map    = google_compute_url_map.http-redirect-urlmap-for-frontend[0].id
}

# Create a redirect urlmap (http->https) for the frontend
resource "google_compute_url_map" "http-redirect-urlmap-for-frontend" {
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name                     = "http-redirect-urlmap-for-${google_cloud_run_v2_service.frontend-service.name}"
  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

# Create a managed certificate for the frontend
resource "google_compute_managed_ssl_certificate" "frontend-ssl" {

  count = tobool(var.enable-domain) ? 1 : 0
  
  name    = "${google_cloud_run_v2_service.frontend-service.name}-ssl-cert"
  project = var.project

  managed {
    domains = ["${var.frontend-subdomain-name}.${var.domain}","homeserve.${var.domain}"]
  }
}

# Create an https forwarding rule for the frontend
resource "google_compute_global_forwarding_rule" "https-lb-for-frontend" {
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name = "https-lb-for-${google_cloud_run_v2_service.frontend-service.name}"

  target     = google_compute_target_https_proxy.https-proxy-for-frontend[0].id
  port_range = "443"
  ip_address = var.frontend-external-ip
}

# Create a https proxy for the the frontend
resource "google_compute_target_https_proxy" "https-proxy-for-frontend" {
  
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name = "https-proxy-for-${google_cloud_run_v2_service.frontend-service.name}"

  url_map = google_compute_url_map.https-urlmap-for-frontend[0].id
  ssl_certificates = [
    google_compute_managed_ssl_certificate.frontend-ssl[0].id
  ]
}

# Create a urlmap for the frontend
resource "google_compute_url_map" "https-urlmap-for-frontend" {
  
  count = tobool(var.enable-domain) ? 1 : 0
  
  name = "https-urlmap-for-${google_cloud_run_v2_service.frontend-service.name}"
  default_service = google_compute_backend_service.backend-service-for-frontend[0].id
}