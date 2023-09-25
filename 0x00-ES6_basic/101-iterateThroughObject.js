export default function iterateThroughObject(reportWithIterator) {
  return [...reportWithIterator].map((employee) => employee).join(' | ');
}
