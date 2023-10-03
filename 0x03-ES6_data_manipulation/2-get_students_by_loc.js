/**
 * Retrives Students in a given location.
 * @param {{
 * id: Number,
 * firstName: String,
 * location: String
 * }[]} students - The list of students.
 * @param {String} city - The location.
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns Array of objects matching the location
 */
export default function getStudentsByLocation(students, city) {
  if (students instanceof Array) {
    return students.filter((student) => student.location === city);
  }
  return [];
}
