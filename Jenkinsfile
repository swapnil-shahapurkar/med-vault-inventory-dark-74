pipeline {
    agent any
    environment {
        IMAGE_NAME = "medvault"
        CONTAINER_NAME = "medvault-container"
    }
    stages {
        stage('Pull Latest Code') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/swapnil-shahapurkar/med-vault-inventory-dark-15.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
