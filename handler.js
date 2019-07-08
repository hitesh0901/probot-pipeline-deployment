// 'use strict';
// var moment = require('moment');

// exports.probot = (event, context, callback) => {
//     callback(null, {
//         "statusCode": 200,
//         "body": "Hello World!!"
//     });
// }

const { serverless } = require('@probot/serverless-lambda')
const appFn = require('./')
module.exports.probot = serverless(appFn)