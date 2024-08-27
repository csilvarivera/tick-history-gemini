/**
 * Copyright 2023 Google LLC
 */
 
 # Output the backend service URI
output "backend-service-uri" {
  value = google_cloud_run_v2_service.backend-service.uri
}