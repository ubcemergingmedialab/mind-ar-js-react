pipeline {
    agent { label 'linux' }
    tools {
        // react-scripts 4 does not build on current Node.js
        nodejs '16'
    }

    stages {
        stage("Checkout"){
            steps {
                checkout scm
            }
        }
        stage("Install dependencies"){
            steps {
                sh 'npm ci'
            }
        }
        stage("Build"){
            steps {
                // CI=true would make Create React App fail the build on lint warnings
                sh 'CI=false npm run build'
            }
        }
        stage("Archive"){
            steps {
                // Fingerprinting allows us to find where a build came from (ie archive files -> version)
                // allowEmptyArchive: false fails the build if no files match
                archiveArtifacts artifacts: 'build/**/*',
                                 fingerprint: true,
                                 allowEmptyArchive: false
            }
        }
    }
}
