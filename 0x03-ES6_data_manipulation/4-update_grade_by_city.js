/**
 * Retrives Students with their added grade
 * @params {{
 * id: Number,
 * firstName: String,
 * location: String
 * }[]} students - The list of students
 * @params {*} city - the location of students
 * @params {{
 * studentId: Number,
 * grade: Number
 * }[]} newGrades - the list of student grade
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns {{id: Number, firstName: String, location: String, grade: Number}[]}
 */
export default function updateStudentGradeByCity(students, city, newGrades) {
  return students.filter((student) => student.location === city).map((student) => {
    const newGrade = newGrades.find((grade) => grade.studentId === student.id);
    return {
      ...student,
      grade: newGrade ? newGrade.grade : 'N/A',
    };
  });
}
