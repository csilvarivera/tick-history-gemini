/**
 * Copyright 2023 Google LLC
 */


# Output the VPC ID
output "vpc-id" {
  value = google_compute_network.vpc.id
}

# Output the VPC name
output "vpc-name" {
  value = google_compute_network.vpc.name
}

# Output the VPC Subnetwork ID
output "subnet-id" {
  value = google_compute_subnetwork.subnet.id
}

# Output the external IP used for the frontend
output "frontend-external-ip" {
  value = tobool(var.enable-domain) ? google_compute_global_address.frontend-external-ip[0].address: ""
}

# Output the VPC Access Connector ID
output "vpc-access-connector-id" {
  value = google_vpc_access_connector.connector.id
}
