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

variable "vpc-name" {
  type        = string
  description = "The name to use for the created VPC"
}

variable "subnet-name" {
  type        = string
  description = "The name to use for the created VPC Subnetwork"
}

variable "enable-domain" {
  description = "Whether to add a specific domain infront of the frontend"
  type        = string
}

variable "domain" {
  description = "The TLD of the managed zone"
  type        = string
}

variable "frontend-subdomain-name" {
  description = "Name of the subdomain to use with the frontend"
  type        = string
}

variable "external-ip-name" {
  description = "Name of the external IP address reserved for cluster Ingress"
  type        = string
}

variable "vpc-access-connector-name" {
  description = "Name of the VPC Access Connector"
  type        = string
}

variable "vpc-access-connector-cidr-range" {
  description = "CIDR range of the VPC Access Connector"
  type        = string
}