module.exports = {
  comments: {
    prWelcomeMessage: 'Thank you for creating the pull request! :tada:\n',
    missingChangeLogMessage: '- Can you please add a new [changelog entry](https://github.com/aws/aws-sdk-java-v2/blob/master/CONTRIBUTING.md#pull-request-readiness)?\n',
    missingCLAMessage: '- Can you please confirm that this pull request can be released under the Apache 2 license?\n'
  },
  testCommands: {
    all: '/tests-all',
    integration: '/tests-integration',
    performance: '/tests-performance',
    stability: '/tests-stability'
  },
  codeBuildProjectName: {
    integration: 'codebuild-demo-project-git',
    performance: 'codebuild-demo-project-git',
    stability: 'codebuild-demo-project-git'
    // integration: 'aws-sdk-java-v2-IntegrationTest-JDK8',
    // performance: 'aws-sdk-java-v2-stabilityTests',
    // stability: 'aws-sdk-java-v2-benchmark'
  },
  returnCodes: {
    success: 'Success',
    error: 'Error'
  }
};
