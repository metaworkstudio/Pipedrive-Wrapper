const pipedrive = require('pipedrive');
const OrganizationsController = require('pipedrive/lib/Controllers/OrganizationsController');

class OrganizationsControllerWrapper extends OrganizationsController {

  /**
   * Find or create an organization
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findOrCreateOrganization(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find an organization
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'organizationField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          // Return founded organization
          then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
              _callback(null, response, null);

              return resolve(response);
            }

            return pipedrive.OrganizationsController.addAnOrganization({
              body: input.body,
            });
          }).
          // Create founded organization
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
   * Find and save or create an organization
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findAndSaveOrganization(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find an organization
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'organizationField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          then(response => {
            // Create an organization
            if (Array.isArray(response.data) && response.data.length === 0) {
              return pipedrive.OrganizationsController.addAnOrganization({
                body: input.body,
              });
            }
            // Save founded organization
            else {
              input.body.id = response.data[0].id;

              return pipedrive.OrganizationsController.updateAnOrganization(input.body);
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

module.exports = OrganizationsControllerWrapper;