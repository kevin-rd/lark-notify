// index.js
const core = require('@actions/core');

try {
  const name = core.getInput('name');
  const message = `Hello, ${name}! Welcome to GitHub Actions!`;
  core.setOutput('message', message);
  console.log(message);
} catch (error) {
  core.setFailed(`Error: ${error.message}`);
}
