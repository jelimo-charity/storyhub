#!/bin/bash

# Enable ingress in Minikube if not already enabled
if command -v minikube &> /dev/null; then
    echo "Enabling Ingress controller in Minikube..."
    minikube addons enable ingress
fi

# Build Docker images
echo "Building Docker images..."
docker build -t storyhub-ui:latest ./ui
docker build -t storyhub-api:latest ./api

# Check if minikube is running
if command -v minikube &> /dev/null; then
    if minikube status | grep -q "Running"; then
        echo "Loading images into Minikube..."
        minikube image load storyhub-ui:latest
        minikube image load storyhub-api:latest
    fi
fi

# Apply Kubernetes manifests
echo "Deploying to Kubernetes..."
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-config.yaml
kubectl apply -f k8s/02-postgres.yaml

echo "Waiting for PostgreSQL to be ready..."
kubectl -n storyhub wait --for=condition=ready pod -l app=postgres --timeout=120s

echo "Deploying API and UI..."
kubectl apply -f k8s/03-api.yaml
kubectl apply -f k8s/04-ui.yaml
kubectl apply -f k8s/05-ingress.yaml

echo "Waiting for all pods to be ready..."
kubectl -n storyhub wait --for=condition=ready pod -l app=api --timeout=120s
kubectl -n storyhub wait --for=condition=ready pod -l app=ui --timeout=120s

echo "Deployment completed!"
echo "Check status with: kubectl -n storyhub get pods"

# If minikube is running, show access information
if command -v minikube &> /dev/null; then
    if minikube status | grep -q "Running"; then
        MINIKUBE_IP=$(minikube ip)
        
        # Check if the entry already exists in /etc/hosts
        if grep -q "storyhub.local" /etc/hosts; then
            echo "Host entry already exists in /etc/hosts"
        else
            echo "Add to /etc/hosts: $MINIKUBE_IP storyhub.local"
        fi
        
        echo ""
        echo "To access the application:"
        echo "1. Run 'minikube tunnel' in a separate terminal (requires sudo)"
        echo "2. Then access the application at: http://storyhub.local"
        echo ""
        echo "Alternatively, you can use these direct service URLs:"
        echo "UI: $(minikube service ui-svc -n storyhub --url)"
        echo "API: $(minikube service api-svc -n storyhub --url)"
    fi
fi
