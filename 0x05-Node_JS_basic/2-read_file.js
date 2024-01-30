const fs = require('fs');

/**
 * This function reads a database file and logs information about
 * the students in the file.
 * @param {string} path - The path to the database file.
 * @author Bekalu Endrias
 * @see {@link https://github.com/bekalue}
 */
function countStudents(path) {
  try {
    // Attempt to read the database file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split the data into lines and gather only student lines as an array
    const students = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));

    console.log(`Number of students: ${students.length}`);

    // Group students by field
    const studentsByField = students.reduce((accumulator, currentLine) => {
      const [name, , , field] = currentLine.split(',');
      if (!accumulator[field]) accumulator[field] = [];
      accumulator[field].push(name);
      return accumulator;
    }, {});

    // Log information about students to STDOUT
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
