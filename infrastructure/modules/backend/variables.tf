/**
 * Copyright 2023 Google LLC
 */
 
 variable "project" {
  type        = string
  description = "The GCP Project name to use for the deployments"
}

variable "region" {
  type        = string
  description = "The GCP Region to use for the deployments"
}

variable "gitlab-host-connection-name" {
  type        = string
  description = "The name of the Gitlab connection in Cloud Build"
}

variable "repo" {
  type        = string
  description = "The name of the Gitlab repo"
}

variable "backend-service-name" {
  description = "Name of the subdomain to use with the backend"
  type        = string
}

variable "vpc-access-connector-id" {
  description = "The ID of the VPC Access Connector"
  type        = string
}

variable "enable-domain" {
  description = "Whether to add a specific domain infront of the frontend"
  type        = string
}

variable "domain" {
  description = "The name of the domain"
  type        = string
}

variable "frontend-subdomain-name" {
  description = "Name of the subdomain for the chatbot frontend"
  type        = string
}

# Variables below are the env vars for the Backend service loaded into the Cloud Run resource confid.

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