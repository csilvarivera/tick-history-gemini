/**
 * Copyright 2023 Google LLC
 */

variable "domain" {
  type        = string
  description = "The pre-registered domain to use for the frontend"
}

variable "enable-domain" {
  type        = string
  description = "Whether or not to add a specific domain above the frontend"
}

variable "enable-iap-on-domain" {
  type        = string
  description = "Whether or not to restrict access to the frontend with IAP"
}

variable "frontend-accessors" {
  type        = string
  description = "The : seperated string of users who can access the frontend through IAP"
}

variable "frontend-subdomain-name" {
  type        = string
  description = "The chosen subdomain to use for the frontend"
}

variable "gitlab-host-connection-name" {
  type        = string
  description = "The name of the Gitlab connection in Cloud Build"
}

variable "project" {
  type        = string
  description = "The Google Cloud Project to deploy resources"
}

variable "region" {
  type        = string
  description = "The Google Cloud Region to deploy resources"
}

variable "repo" {
  type        = string
  description = "The name of the Gitlab repo"
}

# Variables below are the env vars for the Backend service loaded into the Cloud Run resource config.

variable "text2sql-bigquery-dataset-id" {
  description = "The name of the BigQuery dataset"
  type        = string
}

variable "text2sql-bigquery-project-id" {
  description = "The GCP Project ID of the BigQuery project"
  type        = string
}

variable "text2sql-bigquery-table-asset-inventory" {
  description = "The name of the BigQuery table for asset inventory data"
  type        = string
}

variable "text2sql-bigquery-table-sap" {
  description = "The name of the BigQuery table for sap data"
  type        = string
}

variable "text2sql-endpoint-id" {
  description = "The ID of the text2sql endpoint"
  type        = string
}

variable "text2sql-endpoint-project-id" {
  description = "The GCP Project ID of the text2sql endpoint"
  type        = string
}

# Below here are additional variables that are not updated from Cloud Build

variable "artifact-registry-repo-name" {
  type        = string
  description = "The name of the Artifact Registry repo to use for storing workload container images"
  default     = "workload-images"
}

variable "external-ip-name" {
  type        = string
  description = "The name of the static external IP to use with the frontend"
  default     = "frontend-external-ip"
}

variable "vpc-name" {
  type        = string
  description = "The name of the VPC"
  default     = "base-vpc"
}

variable "subnet-name" {
  type        = string
  description = "The name to use for the created VPC Subnetwork"
  default     = "subnet"
}

variable "vpc-access-connector-name" {
  type        = string
  description = "Name of the VPC Access Connector"
  default     = "vpc-access-connector"
}

variable "vpc-access-connector-cidr-range" {
  type        = string
  description = "CIDR range of the VPC Access Connector"
  default     = "10.8.0.0/28"
}

variable "backend-service-name" {
  type        = string
  description = "The name of the backend Cloud Run service"
  default     = "backend"
}