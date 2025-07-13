pipeline {
  agent any

  environment {
    RUN_ENV = 'local'
    ENABLE_TRACE = 'false'
    ENABLE_VIDEO = 'false'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/shakthidharunr/Playwright-cucumber-framework.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test:local'
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh 'npm run report:allure'
      }
    }
  }

  post {
    always {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
  }
}
