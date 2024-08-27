/**
 * Copyright 2023 Google LLC
 */

data "google_project" "project" {
}
 
#########################
#########################
# Part 1: Backend Image #
#########################
#########################

resource "google_artifact_registry_repository" "backend" {
  location      = var.region
  repository_id = "backend"
  description   = "Managed by Terraform - Do not manually edit - backend repository"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }

  lifecycle {
    ignore_changes = [ docker_config ]
  }
}

resource "google_cloudbuild_trigger" "backend" {

  project     = var.project
  location    = var.region
  name        = "backend-build"
  description = "Managed by Terraform - Do not manually edit - Backend image build"
  # service_account = "projects/${var.project}/serviceAccounts/cloud-build-runner@${var.project}.iam.gserviceaccount.com"

  repository_event_config {
    repository = "projects/${var.project}/locations/${var.region}/connections/${var.gitlab-host-connection-name}/repositories/${var.repo}"
    push {
      branch = "main"
    }
  }

  included_files = ["backend/**"]

  substitutions = {
    _PROJECT_ID_ = var.project
    _REGION_     = var.region
  }

  filename = "cloudbuild/backend/cloudbuild.yaml"

}



#############################
#############################
# Part 3: Cloud Run service #
#############################
#############################

# Create the Service Account to use with the Backend Cloud Run service
resource "google_service_account" "backend-service-account" {
  account_id   = "${substr(var.backend-service-name, 0, 26)}-sa"
  display_name = "${title(substr(var.backend-service-name, 0, 26))} Backend Cloud Run SA"
  description  = "Service Account for the Backend Cloud Run Service"
}

# Give the Service Account the Service Account User role
resource "google_project_iam_member" "backend-sa-sa-user-role" {
  project = var.project
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the Big Query Data Editor role
resource "google_project_iam_member" "backend-sa-bq-admin-role" {
  project = var.project
  role    = "roles/bigquery.admin"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the Big Query Data Editor role
resource "google_project_iam_member" "backend-sa-bq-data-editor-role" {
  project = var.project
  role    = "roles/bigquery.dataEditor"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the Big Query Data Editor role
resource "google_project_iam_member" "backend-sa-bq-data-owner-role" {
  project = var.project
  role    = "roles/bigquery.dataOwner"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the Firestore Owner role
resource "google_project_iam_member" "backend-sa-firestore-owner-role" {
  project = var.project
  role    = "roles/datastore.owner"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the GCS Object User
resource "google_project_iam_member" "backend-sa-gcs-object-admin-role" {
  project = var.project
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the GCS Object User
resource "google_project_iam_member" "backend-sa-gcs-admin-role" {
  project = var.project
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the GCS Object Creator
resource "google_project_iam_member" "backend-sa-gcs-creator-role" {
  project = var.project
  role    = "roles/storage.objectCreator"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Service Account the GCS Object Viewer
resource "google_project_iam_member" "backend-sa-gcs-viewer-role" {
  project = var.project
  role    = "roles/storage.objectViewer"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

resource "google_project_iam_member" "backend-sa-ai-platform-user" {
  project = var.project
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

resource "google_project_iam_member" "backend-sa-discovery-engine-admin" {
  project = var.project
  role    = "roles/discoveryengine.admin"
  member  = "serviceAccount:${google_service_account.backend-service-account.email}"
}

# Give the Cloud Build Service Account permissions to act as the Cloud Run service account so it can deploy a revision to Cloud Run
resource "google_service_account_iam_member" "act-as-cloud-run-sa-backend" {
  service_account_id = google_service_account.backend-service-account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

# Create the Backend Cloud Run service with a placeholder container image
resource "google_cloud_run_v2_service" "backend-service" {
  name     = var.backend-service-name
  location = var.region
  ingress = "INGRESS_TRAFFIC_INTERNAL_ONLY"
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
      egress = "PRIVATE_RANGES_ONLY"
    }  
    timeout = "300s"
    service_account = google_service_account.backend-service-account.email   
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      env {
        name  = "APP_PROJECT_ID"
        value = var.project
      }
      env {
        name  = "APP_REGION"
        value = var.region
      } 
      env {
        name  = "APP_TEXT2SQL_BIGQUERY_PROJECT_ID"
        value = var.text2sql-bigquery-project-id
      }
      env {
        name  = "APP_TEXT2SQL_BIGQUERY_DATASET_ID"
        value = var.text2sql-bigquery-dataset-id
      }
      env {
        name  = "APP_TEXT2SQL_BIGQUERY_TABLE_SAP"
        value = var.text2sql-bigquery-table-sap
      }
      env {
        name  = "APP_TEXT2SQL_BIGQUERY_TABLE_ASSET_INVENTORY"
        value = var.text2sql-bigquery-table-asset-inventory
      }
      env {
        name  = "APP_TEXT2SQL_ENDPOINT_PROJECT_ID"
        value = var.text2sql-endpoint-project-id
      }
      env {
        name  = "APP_TEXT2SQL_ENDPOINT_ID"
        value = var.text2sql-endpoint-id
      }
      ports {
        container_port = 80
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

  depends_on = [google_service_account_iam_member.act-as-cloud-run-sa-backend]
}

# Allow the proxy Cloud Run service to run unauthenticated
data "google_iam_policy" "backend-noauth" {

  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }

}

resource "google_cloud_run_service_iam_policy" "backend-noauth" {

  location = google_cloud_run_v2_service.backend-service.location
  project  = google_cloud_run_v2_service.backend-service.project
  service  = google_cloud_run_v2_service.backend-service.name

  policy_data = data.google_iam_policy.backend-noauth.policy_data

  depends_on = [google_cloud_run_v2_service.backend-service]
}


###########################################
###########################################
# Part 4: Private Connectivity to Backend #
###########################################
###########################################

resource "google_dns_managed_zone" "psc-managed-zone" {
  
  name       = "run-app"
  dns_name   = "run.app."
  visibility = "private"

}

# Add an A record for the private.googleapis.com range in the managed zone
resource "google_dns_record_set" "internal-routing-a-record" {
  
  name         = "${google_cloud_run_v2_service.backend-service.uri}."
  managed_zone = google_dns_managed_zone.psc-managed-zone.name
  type         = "A"
  ttl          = 300
  rrdatas = [
    "199.36.153.8"
  ]
}