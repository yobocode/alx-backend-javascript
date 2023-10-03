/**
 * Retrives ids from a list of students
 * @param {{
 * id: Number,
 * firstName: String,
 * location: String
 * }[]} students - The list of students
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns An array of student ids
 */
export default function getListStudentsIds(students) {
  if (students instanceof Array) {
    return students.map((student) => student.id);
  }
  return [];
}
