import * as core from '@actions/core';

async function run() {
  try {
    const name = core.getInput('name');
    const message = `Hello, ${name}! This is a TypeScript GitHub Action!`;
    core.setOutput('message', message);
    console.log(message);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();