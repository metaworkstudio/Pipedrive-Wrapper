const pipedrive = require('pipedrive');
const ActivitiesController = require('pipedrive/lib/Controllers/ActivitiesController');

class ActivitiesControllerWrapper extends ActivitiesController {

  /**
   * Save an activity
   *
   * @param {object} input
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static save(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      let res;

      // Edit an activity
      if (input.id > 0) {
        res = pipedrive.ActivitiesController.updateEditAnActivity(input);
      }// Create an activity
      else {
        res = pipedrive.ActivitiesController.addAnActivity(input);
      }

      res.
          then(response => {
            _callback(null, response, null);

            resolve(response);
          }).
          catch(err => {
            _callback(err, null, null);

            reject(err);
          });
    });
  };

}

module.exports = ActivitiesControllerWrapper;