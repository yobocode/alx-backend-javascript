/**
 * Joins a set of strings with a dash after stripping the strings of
 * a leading sub string.
 * @param {Set<String>} set - A collection of strings.
 * @param {String} startString - The string to strip from the beginning
 * of each item in the set.
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns {String}
 */
export default function cleanSet(set, startString) {
  if (!set || !startString || !(set instanceof Set) || typeof startString !== 'string') {
    return '';
  }
  const parts = [...set.values()]
    .filter((value) => typeof value === 'string' && value.startsWith(startString))
    .map((value) => value.substring(startString.length))
    .filter((valueSubStr) => valueSubStr);
  return parts.join('-');
}
