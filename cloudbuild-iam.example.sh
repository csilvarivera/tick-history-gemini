gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iam.roleAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/resourcemanager.projectIamAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/serviceusage.serviceUsageAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iam.serviceAccountAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/servicenetworking.serviceAgent
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/compute.networkAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/compute.loadBalancerAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/vpcaccess.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iam.serviceAccountCreator
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/run.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/storage.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/storage.objectAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/artifactregistry.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/datastore.owner
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/bigquery.dataEditor
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/oauthconfig.editor
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iam.securityAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iap.settingsAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/iap.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/pubsub.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/logging.logWriter
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/cloudbuild.builds.editor
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/cloudbuild.connectionAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/cloudbuild.integrationsOwner
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com  --condition=None --role=roles/cloudbuild.tokenAccessor