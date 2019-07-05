'use strict';
var moment = require('moment');

exports.probot = (event, context, callback) => {
    callback(null, {
        "statusCode": 200,
        "body": "Hello World!!"
    });
}