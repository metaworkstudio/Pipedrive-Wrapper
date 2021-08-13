const pipedrive = require('pipedrive');
const ProductsController = require('pipedrive/lib/Controllers/ProductsController');

class ProductsControllerWrapper extends ProductsController {

  /**
   * Find or create a product
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findOrCreateProduct(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a product
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'productField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          // Return founded product
          then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
              _callback(null, response, null);

              return resolve(response);
            }

            return pipedrive.ProductsController.addAProduct({
              body: input.body,
            });
          }).
          // Create founded product
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
   * Find and save or create a product
   *
   * @param {object} input
   * @param {object} input.body
   * @param {object} input.params
   * @param {function} [callback]
   * @returns {Promise<unknown>}
   */
  static findAndSaveProduct(input, callback) {
    const _callback = typeof callback === 'function' ? callback : () => undefined;

    return new Promise((resolve, reject) => {
      // Find a product
      pipedrive.ItemsController.
          searchItemByField({
            term: input.params.term,
            fieldType: 'productField',
            fieldKey: input.params.fieldKey,
            returnItemIds: input.params.returnItemIds,
            exactMatch: input.params.exactMatch,
          }, callback).
          then(response => {
            // Create a product
            if (Array.isArray(response.data) && response.data.length === 0) {
              return pipedrive.ProductsController.addAProduct({
                body: input.body,
              });
            }
            // Save founded product
            else {
              input.body.id = response.data[0].id;

              return pipedrive.ProductsController.updateAProduct(input.body);
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

 module.exports = ProductsControllerWrapper;