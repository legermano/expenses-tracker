pipeline {
    agent any
    stages {
        stage('Backend -> Build') {
            agent {
                docker {
                    image 'node:lts-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                dir("backend") {
                    sh 'npm install'
                }
            }
        }
        stage('Backend -> Test') {
            steps {
                dir("backend") {
                    script {
                        withEnv([
                            "PG_USER=postgres",
                            "PG_PASSWORD=postgres",
                            "PG_DATABASE=expenses_tracker_test",
                            "PG_PORT=5432",
                        ]) {
                            docker.image('postgres')
                                  .withRun("-e POSTGRES_USER=${PG_USER} \
                                            -e POSTGRES_PASSWORD=${PG_PASSWORD} \
                                            -e POSTGRES_DB=${PG_DATABASE} \
                                            -p ${PG_PORT}:5432") { c ->
                                docker.image('postgres').inside("--link ${c.id}:db") {
                                    sh 'while ! PGPASSWORD=${PG_PASSWORD} PGHOST=db PGDATABASE=${PG_DATABASE} PGUSER=${PG_USER} pg_isready; do sleep 1; done'
                                }
                                docker.image('node:lts-alpine').inside("--link ${c.id}:localhost") {
                                    sh 'npm test'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}