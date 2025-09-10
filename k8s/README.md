# StoryHub Kubernetes Deployment

This directory contains Kubernetes manifest files for deploying the StoryHub application.

## Prerequisites

- Kubernetes cluster (minikube, kind, or a cloud provider)
- kubectl CLI tool
- Docker (for building images)

## Building Docker Images

Before deploying to Kubernetes, you need to build and tag the Docker images:

```bash
# Build UI image
docker build -t storyhub-ui:latest ./ui

# Build API image
docker build -t storyhub-api:latest ./api
```

## Deployment Steps

### Option 1: Using the deploy script (Recommended)

The simplest way to deploy is using the provided script:

```bash
# Make the script executable if needed
chmod +x k8s/deploy.sh

# Run the deployment script
./k8s/deploy.sh
```

The script will:
1. Build the Docker images
2. Load images into Minikube (if using Minikube)
3. Create the namespace, ConfigMap, and Secret
4. Deploy PostgreSQL, API, and UI components
5. Set up the Ingress
6. Provide instructions for accessing the application

### Option 2: Manual deployment

Deploy the application components in the following order:

1. Create namespace:
   ```bash
   kubectl apply -f k8s/00-namespace.yaml
   ```

2. Create ConfigMap and Secret:
   ```bash
   kubectl apply -f k8s/01-config.yaml
   ```

3. Deploy PostgreSQL:
   ```bash
   kubectl apply -f k8s/02-postgres.yaml
   ```

4. Deploy API:
   ```bash
   kubectl apply -f k8s/03-api.yaml
   ```

5. Deploy UI:
   ```bash
   kubectl apply -f k8s/04-ui.yaml
   ```

6. Deploy Ingress:
   ```bash
   kubectl apply -f k8s/05-ingress.yaml
   ```

## Accessing the Application in Minikube

### Setting up Ingress

1. Enable the Ingress addon if not already enabled:
   ```bash
   minikube addons enable ingress
   ```

2. Add an entry to your /etc/hosts file:
   ```bash
   echo "$(minikube ip) storyhub.local" | sudo tee -a /etc/hosts
   ```

3. Create a tunnel for the Ingress (in a separate terminal):
   ```bash
   minikube tunnel
   ```
   This command requires sudo access and must keep running to maintain access.

4. Access the application at: http://storyhub.local

### Alternative: Direct Service Access

If you have issues with Ingress, you can access the services directly:

```bash
# Convert services to NodePort type
kubectl -n storyhub patch svc ui-svc -p '{"spec": {"type": "NodePort"}}'
kubectl -n storyhub patch svc api-svc -p '{"spec": {"type": "NodePort"}}'

# Get URLs for direct access
minikube service ui-svc -n storyhub --url
minikube service api-svc -n storyhub --url
```

## Troubleshooting

### Checking Pod Status
```bash
kubectl -n storyhub get pods
```

### Viewing Pod Logs
```bash
kubectl -n storyhub logs -l app=ui
kubectl -n storyhub logs -l app=api
```

### Restarting Deployments
```bash
kubectl -n storyhub rollout restart deployment/ui
kubectl -n storyhub rollout restart deployment/api
```
