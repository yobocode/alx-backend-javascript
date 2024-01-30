const express = require('express');
const fs = require('fs');

const port = 1245;
const host = 'localhost';
const app = express();
const databaseFile = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath - The path to the CSV data file.
 * @author Bekalu Endrias
 * @see {@link https://github.com/bekalue}
 * @returns {Promise} A promise that resolves when the operation is complete.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  } else {
    fs.readFile(dataPath, (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const reportParts = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName, studentPropValues[idx],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          reportParts.push(`Number of students in ${field}: ${group.length}. List: ${
            group.map((student) => student.firstname).join(', ')
          }`);
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

app.get('/', (request, response) => {
  response.status(200).send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  countStudents(databaseFile).then((report) => {
    response.status(200).send(`This is the list of our students\n${report}`);
  }).catch((error) => {
    response.send(`This is the list of our students\n${error instanceof Error ? error.message : error.toString()}`);
  });
});

app.listen(port, host, () => {
  process.stdout.write(`Server listening at -> http://${host}:${port}/`);
});

module.exports = app;
