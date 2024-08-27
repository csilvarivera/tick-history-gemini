# WSY - Gemini
consider running this repo locally as first instance

### 1. Infrastructure Deployment

Terraform will build a base architecture consisting of:
- A Cloud Run service for the backend
- A Cloud Run service for the frontend
- Private networking configuration between the frontend and the backend
Public networking configuration between the internet and the frontend.

The Terraform intentionally does not manage:
- The Prediction endpoint for the Text2SQL Model. This is because the demo uses a non-production evalaution version of this feature which is deployed manually as a custom model onto a Vertex AI Endpoint. The [/backend/[External]_Experimental_Text2SQL_V2_launch.ipynb](./backend/[External]_Experimental_Text2SQL_V2_launch.ipynb) file explains this process and users of this demo will need to follow this example flow to provision their own text2sql endpoint in their Project.

- The source BigQuery Dataset(s) and Table(s) used by the Text2SQL Model. Users will need to ensure the Text2SQL endpoint Service Account has IAM permissions on the desired source tables. Also, if any changes are made to the source data schema, users will need to update the [/backend/components/text2bqbottext2sql.py](./backend/components/text2bqbottext2sql.py) code to adjust the prompt that the Model uses to query the tables.

- The Looker Dashboard (and the BigQuery Table that sits behind this Looker Dashboard, should that be different to the BigQuery Table used by the Text2SQL endpoint)

![infrastructure diagram](/infrastructure/modules/backend/resources/architecture-diagram.png)

Configuration env var values in step 2 will allow you configure this deployment. And important consideration is the public networking setup:
-  whether or not an existing domain is provided to be used. If so, set ENABLE_DOMAIN=true and DOMAIN=YOUR-DOMAIN.
- If using a custom domain, you can also then decide to add an authentication layer on top of this endpoint by using the Identity Aware Proxy (IAP) feature from Google Cloud. To enable this authentication, simply set ENABLE_IAP_ON_DOMAIN=true and then provide a colon delimited list of Google accounts that are able to authenticate through the domain using FRONTEND_ACCESSORS="user1@google.com:user2@googleaccount.com:user3@anotheraccount.com".

The demo assumes a simple setup connecting the git repo to the CI/CD process. We use GitLab linked registered as a Repo in Cloud Build [Cloud Build](https://cloud.google.com/build?hl=en) where Cloud Build acts as the CI/CD runners for the Terraform, Docker and gcloud deployment steps.

#### Deployment steps

1. Follow the intructions for [Connecting Cloud Build to a GitLab repository](https://cloud.google.com/build/docs/automating-builds/gitlab/connect-repo-gitlab) (or follow a similar process for an alternative git repository and then adjust the trigger creation steps later.)

2. Setup Environment Variables

Edit the below with your own details:

```
export ENABLE_DOMAIN=false  ENABLE_IAP_ON_DOMAIN=true DOMAIN=gen-ai.chat FRONTEND_SUBDOMAIN_NAME=th-gemini PROJECT_ID=csilvariverademo REGION=us-central1 GITLAB_HOST_CONNECTION_NAME=csilvarivera-host REPO_NAME=lseg-talk FRONTEND_IMAGE_NAME=frontend BACKEND_IMAGE_NAME=backend FRONTEND_ACCESSORS="csilvarivera@google.com:richradley@google.com:timpenfold@google.com"


```

3. Enable APIs

```
gcloud config set project $PROJECT_ID
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format 'value(projectNumber)')

gcloud services enable iam.googleapis.com cloudbuild.googleapis.com storage.googleapis.com cloudresourcemanager.googleapis.com compute.googleapis.com dns.googleapis.com serviceusage.googleapis.com
```

4. Create GCS Bucket for the Terraform Init state

```
TF_STATE_BUCKET_NAME=$PROJECT_ID-tf-state

gsutil mb gs://$TF_STATE_BUCKET_NAME
gsutil versioning set on gs://$TF_STATE_BUCKET_NAME
```

5. Create a Service Account for Cloud Build

```
gcloud iam service-accounts create cloud-build-runner --description="cloud-build-sa" --display-name="cloud-build-sa"
```

6. Grant Cloud Build additional permissions to permission to manage the Project

```
cp "cloudbuild-iam.example.sh" "cloudbuild-iam.sh"
```

```
. cloudbuild-iam.sh
```

7.  Apply the Build Trigger for the infrastructure (run command from the repo root )

```
gcloud beta builds triggers create gitlab --name=tf-apply --region=$REGION --service-account="projects/$PROJECT_ID/serviceAccounts/cloud-build-runner@$PROJECT_ID.iam.gserviceaccount.com" --repository="projects/$PROJECT_ID/locations/$REGION/connections/$GITLAB_HOST_CONNECTION_NAME/repositories/$REPO_NAME" --branch-pattern=main --build-config=cloudbuild/infrastructure/cloudbuild.yaml --included-files=infrastructure/** --substitutions _TF_STATE_BUCKET_NAME_=$TF_STATE_BUCKET_NAME,_GITLAB_HOST_CONNECTION_NAME_=$GITLAB_HOST_CONNECTION_NAME,_REPO_NAME_=$REPO_NAME,_PROJECT_ID_=$PROJECT_ID,_REGION_=$REGION,_ENABLE_DOMAIN_=$ENABLE_DOMAIN,_ENABLE_IAP_ON_DOMAIN_=$ENABLE_IAP_ON_DOMAIN,_DOMAIN_=$DOMAIN,_FRONTEND_SUBDOMAIN_NAME_=$FRONTEND_SUBDOMAIN_NAME,_FRONTEND_ACCESSORS_=$FRONTEND_ACCESSORS,_TEXT2SQL_BIGQUERY_PROJECT_ID_=$TEXT2SQL_BIGQUERY_PROJECT_ID,_TEXT2SQL_BIGQUERY_DATASET_ID_=$TEXT2SQL_BIGQUERY_DATASET_ID,_TEXT2SQL_BIGQUERY_TABLE_SAP_=$TEXT2SQL_BIGQUERY_TABLE_SAP,_TEXT2SQL_BIGQUERY_TABLE_ASSET_INVENTORY_=$TEXT2SQL_BIGQUERY_TABLE_ASSET_INVENTORY,_TEXT2SQL_ENDPOINT_PROJECT_ID_=$TEXT2SQL_ENDPOINT_PROJECT_ID,_TEXT2SQL_ENDPOINT_ID_=$TEXT2SQL_ENDPOINT_ID
```

8. Run the Build Trigger for the infrastructure

```
gcloud builds triggers run tf-apply --region=$REGION --project=$PROJECT_ID --branch=main
```

### 2. Backend service build and deployment

The Terraform will have created:
- A Cloud Run service running a placeholder Container
- A Cloud Build Trigger to build the correct backend service from source code in [/backend](./backend) and deploy it to the Cloud Run service

Before doing so, please review the local config file at [/backend/config-local-settings.json](./backend/config-local-settings.json). This provides environment variables for running locally. These values will be overwritten by any environment variables that are attached to the Cloud Run service config (which are viewable and changeable the terraform resource for the Cloud Build service in [/infrastructure/modules/backend/main.tf](./infrastructure/modules/backend/main.tf) )

It is in these two locations that a user should set up their own values for BigQuery Datasets, Tables, Text2SQL endpoints, Prediction model endpoints, etc. 

**Running Locally:**

From the /backend directory:
```
python -m venv .venv
source .venv/bin/activate
```

select/confirm the .venv as the python interpreter in VScode
```
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Running the Cloud Build Trigger to deploy to production:**

```
gcloud builds triggers run backend-build --region=global --project=$PROJECT_ID --branch=main
```


### 3. Frontend service build and deployment

The Terraform will have created:
- A Cloud Run service running a placeholder Container
- A Cloud Build Trigger to build the correct backend service from source code in [/backend](./backend) and deploy it to the Cloud Run service

**Running Locally:**

From the /frontend directory:
```
npx next dev
```

When running locally, the config file .env.development will be read and the endpoint for the backend will be set to `BACKEND_ENDPOINT=http://localhost:8000`. So a locally running frontend assumes a locally running backend service.

**Running the Cloud Build Trigger to deploy to production:**
```
gcloud builds triggers run frontend-build --region=global --project=$PROJECT_ID --branch=main
```