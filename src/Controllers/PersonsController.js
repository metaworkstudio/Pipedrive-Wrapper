const pipedrive = require('pipedrive');
const PersonsController = require('pipedrive/lib/Controllers/PersonsController');

class PersonsControllerWrapper extends PersonsController {

  /**
   * Find or create a person
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findOrCreatePerson(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a person
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'personField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          // Return founded person
          then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
              _callback(null, response, null);

              return resolve(response);
            }

            return pipedrive.PersonsController.addAPerson({
              body: input.body,
            });
          }).
          // Create founded person
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
   * Find and save or create a person
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findAndSavePerson(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a person
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'personField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          then(response => {
            // Create a person
            if (Array.isArray(response.data) && response.data.length === 0) {
              return pipedrive.PersonsController.addAPerson({
                body: input.body,
              });
            }
            // Save founded person
            else {
              input.body.id = response.data[0].id;

              return pipedrive.PersonsController.updateAPerson(input.body);
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

 module.exports = PersonsControllerWrapper;