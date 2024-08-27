/**
 * Copyright 2023 Google LLC
 */

module "networking" {

  # Set Source
  source = "./modules/networking"

  # Define Variables
  project                         = var.project
  region                          = var.region
  vpc-name                        = var.vpc-name
  subnet-name                     = var.subnet-name
  vpc-access-connector-name       = var.vpc-access-connector-name
  vpc-access-connector-cidr-range = var.vpc-access-connector-cidr-range
  enable-domain                   = var.enable-domain
  domain                          = var.domain
  frontend-subdomain-name         = var.frontend-subdomain-name
  external-ip-name                = var.external-ip-name

  depends_on = [
    google_project_service.enable-required-apis,
    google_project_service.enable-iap-api
  ]

}

module "backend" {

  # Set Source
  source = "./modules/backend"

  # Define Environment Variables
  project                              = var.project
  region                               = var.region
  gitlab-host-connection-name          = var.gitlab-host-connection-name
  repo                                 = var.repo
  backend-service-name                 = var.backend-service-name
  vpc-access-connector-id              = module.networking.vpc-access-connector-id
  enable-domain                        = var.enable-domain
  domain                               = var.domain
  frontend-subdomain-name              = var.frontend-subdomain-name
  text2sql-bigquery-project-id         = var.text2sql-bigquery-project-id
  text2sql-bigquery-dataset-id         = var.text2sql-bigquery-dataset-id
  text2sql-bigquery-table-sap          = var.text2sql-bigquery-table-sap
  text2sql-bigquery-table-asset-inventory = var.text2sql-bigquery-table-asset-inventory
  text2sql-endpoint-project-id         = var.text2sql-endpoint-project-id
  text2sql-endpoint-id                 = var.text2sql-endpoint-id

  depends_on = [
    module.networking,
    google_project_service.enable-required-apis,
    google_project_service.enable-iap-api
  ]
}

module "frontend" {

  # Set Source
  source = "./modules/frontend"

  # Define Environment Variables
  project                              = var.project
  region                               = var.region
  gitlab-host-connection-name          = var.gitlab-host-connection-name
  repo                                 = var.repo
  frontend-subdomain-name              = var.frontend-subdomain-name
  enable-domain                        = var.enable-domain
  domain                               = var.domain
  enable-iap-on-domain                 = var.enable-iap-on-domain
  frontend-accessors                   = var.frontend-accessors
  vpc-access-connector-id              = module.networking.vpc-access-connector-id
  frontend-external-ip                 = module.networking.frontend-external-ip
  backend-service-uri                  = module.backend.backend-service-uri

  depends_on = [
    module.networking,
    module.backend,
    google_project_service.enable-required-apis,
    google_project_service.enable-iap-api
  ]

}