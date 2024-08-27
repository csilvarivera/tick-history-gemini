terraform {
  backend "gcs" {}
  required_providers {
    google-beta = {
      source = "hashicorp/google-beta"
      version = "5.34.0"
    }
    google = {
      source = "hashicorp/google"
      version = "5.34.0"
    }
  }
}

provider "google" {
  project = var.project
}

provider "google-beta" {
  project = var.project
}