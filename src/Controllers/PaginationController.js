const pipedrive = require('pipedrive');

/**
 * Pagination controller
 */
class PaginationController {

  /**
   * Collect all records in the queue
   *
   * @param fn
   * @param input
   * @param callback
   * @returns {Promise<unknown>}
   */
  static all(fn, input, callback) {
    return new Promise((resolve, reject) => {
      let dataset = [];
      input.start = 0;
      input.limit = input && input.limit > 0 ? input.limit : 500;

      const fnCallback = (err, response, context) => {
        if (err) {
          reject(err);

          return Promise.reject(err);
        }

        dataset = dataset.concat(response.data);

        let dataAvailable = false;

        if (response['additional_data']
            && response['additional_data']['pagination']
            && response['additional_data']['pagination']['more_items_in_collection']) {
          dataAvailable = response['additional_data']['pagination']['more_items_in_collection'];
        }

        if (!dataAvailable) {
          response.data = dataset;

          if (typeof callback === 'function') {
            callback(err, response, context);
          }

          resolve(response);

          return;
        }

        input.start = response['additional_data']['pagination']['next_start'];
        fn(input, fnCallback);
      };

      fn(input, fnCallback);
    });
  }

}

module.exports = PaginationController;
