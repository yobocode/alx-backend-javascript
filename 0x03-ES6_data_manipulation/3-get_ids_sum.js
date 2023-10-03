/**
 * Retrive the total sum of ids of list of students.
 * @param {{
 * id: Number,
 * firstName: String,
 * location: String
 * }[]} students - The list of students
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns Total sum of student id
 */
export default function getStudentIdsSum(students) {
  if (students instanceof Array) {
    return students.reduce((total, student) => total + student.id, 0);
  }
  return 0;
}
