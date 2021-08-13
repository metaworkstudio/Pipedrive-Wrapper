const pipedrive = require('pipedrive');
const DealsController = require('pipedrive/lib/Controllers/DealsController');

class DealsControllerWrapper extends DealsController {

  /**
   * Find or create a deal
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findOrCreateDeal(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a deal
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'dealField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          // Return founded deal
          then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
              _callback(null, response, null);

              return resolve(response);
            }

            return pipedrive.DealsController.addADeal({
              body: input.body,
            });
          }).
          // Create founded deal
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

  /**
   * Find and save or create a deal
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findAndSaveDeal(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a deal
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'dealField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          then(response => {
            // Create a deal
            if (Array.isArray(response.data) && response.data.length === 0) {
              return pipedrive.DealsController.addADeal({
                body: input.body,
              });
            }
            // Save founded deal
            else {
              input.body.id = response.data[0].id;

              return pipedrive.DealsController.updateADeal(input.body);
            }
          }).
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

 module.exports = DealsControllerWrapper;