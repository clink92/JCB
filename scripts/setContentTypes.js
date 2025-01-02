
const fs = require('fs');
const path = require('path');

// Function to recursively find CSS files
const findCssFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findCssFiles(filePath, fileList);
    } else if (path.extname(file) === '.css') {
      fileList.push(filePath);
    }
  });

  return fileList;
};

// Set proper content type for CSS files
const setBuildContentTypes = () => {
  const buildDir = path.join(__dirname, '../build');
  const cssFiles = findCssFiles(buildDir);

  cssFiles.forEach(file => {
    // Add content type comment at the beginning of CSS files
    const content = fs.readFileSync(file, 'utf8');
    const contentWithType = `/* Content-Type: text/css */\n${content}`;
    fs.writeFileSync(file, contentWithType);
  });
};

setBuildContentTypes();