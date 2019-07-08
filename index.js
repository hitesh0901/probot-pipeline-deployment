/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const config = require('./constants');

const {
  getChangeLogStatus,
  getClaCheckStatus
} = require('./util');

module.exports = app => {
  app.log('Yay, the app was loaded!');

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' });
    return context.github.issues.createComment(issueComment);
  });

  app.on('pull_request.opened', async context => {
    /* Missing Changelog check */
    let prNumber = context.payload.pull_request.number;
    let prOwner = context.payload.pull_request.user.login;
    let prRepo = context.payload.pull_request.head.repo.name;
    let prListFilesArg = {
      owner: prOwner,
      repo: prRepo,
      number: prNumber
    };
    const prFiles = await context.github.pullRequests.listFiles(prListFilesArg);
    let changeLogStatus = getChangeLogStatus(prFiles);

    /* Missing CLA check */
    const prBody = context.payload.pull_request.body;
    let claCheck = getClaCheckStatus(prBody);

    /* Comment */
    app.log('ChangeLog status : ' + changeLogStatus);
    app.log('CLA status : ' + claCheck);
    let commentBody = config.comments.prWelcomeMessage;
    let customComment = {
      ...prListFilesArg,
      body: commentBody
    };
    if (!changeLogStatus) {
      commentBody = commentBody + config.comments.missingChangeLogMessage;
    }
    if (!claCheck) {
      commentBody = commentBody + config.comments.missingCLAMessage;
    }
    customComment.body = commentBody;
    return context.github.issues.createComment(customComment);

    /* Assign Reviewer */
    // assignReviewer(context);
    });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
