/**
 * Checks if a set contains each element in an array.
 * @param {Set} set - The collection of unique items.
 * @param {*} arr - The array of items.
 * @author Yibrah Teare <https://github.com/yobocode>
 * @returns {Boolean}
 */
export default function hasValuesFromArray(set, arr) {
  return arr.every((element) => set.has(element));
}
