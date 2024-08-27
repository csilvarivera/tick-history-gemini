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

variable "frontend-subdomain-name" {
  description = "Name of the subdomain for the chatbot frontend"
  type        = string
}

variable "enable-domain" {
  description = "Whether to add a specific domain infront of the frontend"
  type        = string
}


variable "domain" {
  description = "The name of the provided domain if enable-domain=true"
  type        = string
}

variable "enable-iap-on-domain" {
  type        = string
  description = "Whether or not to restrict access to the frontend with IAP"
}

variable "frontend-accessors" {
  type        = string
  description = "The : seperated string of users who can access the frontend through IAP"
}

variable "vpc-access-connector-id" {
  description = "The ID of the VPC Access Connector"
  type        = string
}

variable "frontend-external-ip" {
  description = "The IP address of the frontend"
  type        = string
}

variable "backend-service-uri" {
  description = "The URI of the backend service"
  type        = string
}