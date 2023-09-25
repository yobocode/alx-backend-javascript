export default function appendToEachArrayValue(array, appendString) {
  const concatArray = [];
  for (const value of array) {
    const idx = array.indexOf(value);
    concatArray[idx] = appendString + value;
  }

  return concatArray;
}
