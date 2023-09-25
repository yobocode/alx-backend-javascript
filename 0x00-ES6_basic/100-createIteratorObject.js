export default function createIteratorObject(report) {
  return (
    Object.values(report.allEmployees)
      .reduce((acc, curr) => acc.concat(curr), [])
  );
}
