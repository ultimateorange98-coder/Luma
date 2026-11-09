const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

let built = false;
for (const py of ['python', 'python3']) {
  try {
    execSync(`${py} scripts/build_site.py`, { cwd: root, stdio: 'inherit' });
    built = true;
    break;
  } catch (e) {
    // try next command
  }
}

if (!built) {
  const indexExists = fs.existsSync(path.join(root, 'index.html'));
  if (indexExists) {
    console.log('Using pre-compiled static HTML pages for deployment.');
  } else {
    console.error('Error: Python is required to build the HTML files from source, but neither python nor python3 was found.');
    process.exit(1);
  }
}
