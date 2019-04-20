#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Checkout') {

            steps {
                echo 'Checking out from SCM'

                checkout scm
            }
        
        }

        stage('Build') {
            steps {
                echo 'Building...'

                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'

                sh 'npm run test'
            }
        }

        stage('Confirm Release') {
            steps {
                script {
            
                    def userInput = input message: 'Input required',
                        parameters: [
                            choice(name : 'RELEASE', choices: 'yes\no', description: 'Release?')
                        ]
            
                    env.RELEASE = userInput.RELEASE
                }
            }
        }

        stage('Release') {
            when {

                expression {
                    env.RELEASE === 'yes'
                }

            }

            steps {
                echo 'Releasing...'
            }
        }
    }
}
