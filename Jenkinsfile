pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "med-vault-inventory"
    CONTAINER_NAME = "med-vault-container"
  }
  stages {
    stage('Clone') {
      steps {
        git credentialsId: 'github-creds',
            url: 'https://github.com/swapnil-shahapurkar/med-vault-inventory-dark-15.git',
            branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Deploy') {
      steps {
        sh "docker stop $CONTAINER_NAME || true"
        sh "docker rm $CONTAINER_NAME || true"
        sh "docker run -d -p 80:80 --name $CONTAINER_NAME $DOCKER_IMAGE"
      }
    }
  }
}
