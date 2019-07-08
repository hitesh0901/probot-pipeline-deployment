/**
 * @param {object} prFiles details of files changed in pull request.
 * @return {boolean} whether changelog is present for pull request.
 *
 */
const getChangeLogStatus = (prFiles) => {
  let changeLogStatus = false;
  for (let i = 0; i < prFiles.data.length; i++) {
    let fileName = prFiles.data[i].filename;
    console.log(fileName);
    const regex = '\\.changes\\/next-release\\/.*\\.json';
    const match = fileName.match(regex);
    if (match && match[0] === fileName) {
      changeLogStatus = true;
      break;
    }
  }
  return changeLogStatus;
};

/**
 * @param {string} prBody description of pull request.
 * @return {boolean} whether changelog is present for pull request.
 *
 */
const getClaCheckStatus = (prBody) => {
  let claCheckStatus = false;
  let index = prBody.indexOf('I confirm that this pull request can be released under the Apache 2 license');
  let closedBracketIndex = index;
  let openBracketIndex = 0;
  while (--index >= 0) {
    if (prBody.charAt(index) === ']') {
      closedBracketIndex = index;
      break;
    }
  }
  while (--index >= 0) {
    if (prBody.charAt(index) === '[') {
      openBracketIndex = index;
      break;
    }
  }
  let substring = prBody.substring(openBracketIndex + 1, closedBracketIndex);
  if (substring.trim() === 'x') {
    claCheckStatus = true;
  }
  return claCheckStatus;
};

module.exports.getChangeLogStatus = getChangeLogStatus;
module.exports.getClaCheckStatus = getClaCheckStatus;
