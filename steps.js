const fs = require('fs');
const filePath = './steps.d.ts';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;

  let fixedData = data.replace(/type (\w+) = typeof import\(['"](.+?)['"]\);/g, "type $1 = import('$2');");

  fs.writeFile(filePath, fixedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('Fixed steps.d.ts!');
  });
});
