/**
 * A weak map of endpoints and the number of calls made.
 */
export const weakMap = new WeakMap();

/**
 * Tracks the number of calls made to an API's endpoint.
 * @param {{
 *   protocol: String,
 *   name: String,
 * }} endpoint - The endpoint to make a request to.
 * @author Yibrah Teare <https://github.com/yobocode>
 */
export function queryAPI(endpoint) {
  if (!weakMap.has(endpoint)) {
    weakMap.set(endpoint, 1);
  } else {
    const count = weakMap.get(endpoint);
    if (count >= 4) {
      throw new Error('Endpoint load is high');
    }
    weakMap.set(endpoint, count + 1);
  }
}
