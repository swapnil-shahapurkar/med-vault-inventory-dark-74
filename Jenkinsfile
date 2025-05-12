pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'medvault'
        CONTAINER_NAME = 'medvault_container'
        PORT_MAPPING = '3000:4173'
    }

    tools {
        nodejs 'NodeJS_18' // Make sure you configured this Node.js tool in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/swapnil-shahapurkar/med-vault-inventory-dark-74.git', branch: 'main'
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    sh """
                        docker stop \$CONTAINER_NAME || true
                        docker rm \$CONTAINER_NAME || true
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t \$DOCKER_IMAGE .'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d --name \$CONTAINER_NAME -p \$PORT_MAPPING \$DOCKER_IMAGE'
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Deployment successful!'
        }
    }
}
