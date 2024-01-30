const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const databaseFile = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
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
          reportParts.push(
            `Number of students in ${field}: ${group.length}. List: ${
              group.map((student) => student.firstname).join(', ')
            }`,
          );
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

app.on('request', (request, response) => {
  if (request.url === '/') {
    const responseText = 'Hello Holberton School!';
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Content-Length', responseText.length);
    response.statusCode = 200;
    response.write(Buffer.from(responseText));
  } else if (request.url === '/students') {
    countStudents(databaseFile)
      .then((report) => {
        const responseText = `This is the list of our students\n${report}`;
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Length', responseText.length);
        response.statusCode = 200;
        response.write(Buffer.from(responseText));
      })
      .catch((error) => {
        const responseText = `This is the list of our students\n${
          error instanceof Error ? error.message : error.toString()
        }`;
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Length', responseText.length);
        response.statusCode = 200;
        response.write(Buffer.from(responseText));
      });
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
