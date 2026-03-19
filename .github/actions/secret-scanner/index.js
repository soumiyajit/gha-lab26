const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const searchPath = core.getInput('search_path');
    const filePath = path.join(process.cwd(), searchPath, 'db.js');

    if (!fs.existsSync(filePath)) {
      core.info(`No file found at ${filePath}, skipping scan.`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to find: mongodb+srv://username:password@cluster
    const secretRegex = /mongodb\+srv:\/\/[a-zA-Z0-9._%+-]+:[a-zA-Z0-9._%+-]+@/g;

    if (secretRegex.test(content)) {
      core.setFailed('CRITICAL SECURITY ERROR: Hardcoded MongoDB credentials detected in db.js!');
      core.error('Please use process.env.MONGO_URI instead of hardcoding passwords.');
    } else {
      core.info('Security Scan Passed: No hardcoded credentials found.');
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();