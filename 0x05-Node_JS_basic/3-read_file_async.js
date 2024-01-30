const fs = require('fs').promises;

/**
 * This function reads a database file asynchronusly
 * and logs information about the students in the file.
 * @param {string} path - The path to the database file.
 * @author Bekalu Endrias
 * @see {@link https://github.com/bekalue}
 * @returns {Promise} A promise that resolves when the operation is complete.
 */
async function countStudents(path) {
  try {
    // Attempt to read the database file asynchronously
    const data = await fs.readFile(path, 'utf8');

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

    // Log the number of students in each field
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
