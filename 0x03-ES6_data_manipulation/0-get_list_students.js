/**
 * Retrives list of students
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns {{id: Number, firstName: string, location: String}[]}
 */
export default function getListStudents() {
  return [
    { id: 1, firstName: 'Guillaume', location: 'San Francisco' },
    { id: 2, firstName: 'James', location: 'Columbia' },
    { id: 5, firstName: 'Serena', location: 'San Francisco' },
  ];
}
