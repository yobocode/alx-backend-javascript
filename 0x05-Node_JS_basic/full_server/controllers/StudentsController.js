import readDatabase from '../utils';

/**
 * The list of supported majors.
 */
const VALID_MAJORS = ['CS', 'SWE'];

/**
 * Contains the student-related route handlers.
 * @class StudentsController
 * @author Bekalu Endrias
 * @see {@link https://github.com/bekalue}
 */
class StudentsController {
/**
   * Sends a response with a list of all students.
   * @param {Object} request - The request object
   * @param {Object} response - The response object
   */
  static getAllStudents(request, response) {
    const dataPath = process.argv[2] || '';

    readDatabase(dataPath)
      .then((studentGroups) => {
        const responseParts = ['This is the list of our students'];
        const cmpFxn = (a, b) => a[0].localeCompare(b[0], 'en', { sensitivity: 'base' });

        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
        }
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }

  /**
   * Sends a response with a list of all students by major.
   * @param {Object} request - The request object
   * @param {Object} response - The response object
   */
  static getAllStudentsByMajor(request, response) {
    const dataPath = process.argv[2] || '';
    const { major } = request.params;

    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(dataPath)
      .then((studentGroups) => {
        let responseText = '';

        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }
        response.status(200).send(responseText);
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
}

export default StudentsController;
