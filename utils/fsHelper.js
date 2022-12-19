const fs = require('fs');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (location, body) =>
  fs.writeFile(location, JSON.stringify(body, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nThe data has been written in ${location}`)
  );
const readAndAppend = (body, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(body);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };