/**
 * @class AppController
 * @author Bekalu Endrias
 * @see {@link https://github.com/bekalue}
 */
class AppController {
  /**
   * Sends a response with a status code of 200 and a body containing the string
   * 'Hello Holberton School!'
   *
   * @param {Object} request - The request object
   * @param {Object} response - The response object
   */
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
