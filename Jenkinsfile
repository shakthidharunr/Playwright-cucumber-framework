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
        git branch: 'main', url: 'https://github.com/shakthidharunr/Playwright-cucumber-framework.git'
      }
    }

     stage('Check Node & npm Versions') {
      steps {
        bat 'node -v'
        bat 'npm -v'
      }
    }

stage('Install Dependencies') {
  steps {
    bat 'npm install'
  }
}

    stage('Run Tests') {
      steps {
        bat 'npm run test:local'
      }
    }

    stage('Generate Allure Report') {
      steps {
        bat 'npm run report:allure'
      }
    }
  }

  post {
    always {
      allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
    }
  }
}
