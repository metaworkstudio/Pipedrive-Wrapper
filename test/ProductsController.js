require('dotenv').config();
const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;

const data = {
  product: {
    name: '[TEST] test product for testing',
    code: '[TEST] 00001',
  },
};

describe('ProductsController', function() {
  function beforeAndAfterSuit(done) {
    pipedrive.ItemsController.searchItemByField({
      term: data.product.name,
      fieldType: 'productField',
      exactMatch: true,
      fieldKey: 'name',
      returnItemIds: true,
      limit: 1,
    }).
        then(response => {
          try {
            if (response.data.length === 0) {
              return done();
            }

            pipedrive.ProductsController.deleteAProduct(response.data[0].id).
                then(() => done());
          } catch (ex) {
            return done(ex);
          }
        });
  }

  describe('#findOrCreateProduct()', function() {
    before('Remove a test product before the start', beforeAndAfterSuit);
    after('Remove a test product before the start', beforeAndAfterSuit);

    it('Create a product', function(done) {
      pipedrive.ProductsController.
          findOrCreateProduct({
                body: {
                  name: data.product.name,
                  code: data.product.code,
                },
                params: {
                  term: data.product.name,
                  fieldKey: 'name',
                  returnItemIds: true,
                  exactMatch: true,
                },
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data.id > 0, true);

              return done();
            } catch (ex) {
              return done(ex);
            }
          }).
          catch(err => {
            return done(err);
          });
    });
    it('Find a product', function(done) {
      pipedrive.ProductsController.
          findOrCreateProduct({
                body: {
                  name: data.product.name,
                  code: data.product.code,
                },
                params: {
                  term: data.product.name,
                  fieldKey: 'name',
                  returnItemIds: true,
                  exactMatch: true,
                },
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data.length > 0, true);

              return done();
            } catch (ex) {
              return done(ex);
            }
          }).
          catch(err => {
            return done(err);
          });
    });
  });

  describe('#findAndSaveProduct()', function() {
    before('Remove a test product before the start', beforeAndAfterSuit);
    //after('Remove a test product before the start', beforeAndAfterSuit);

    it('Create a product', function(done) {
      pipedrive.ProductsController.
          findAndSaveProduct({
                body: {
                  name: data.product.name,
                  code: data.product.code,
                },
                params: {
                  term: data.product.name,
                  fieldKey: 'name',
                  returnItemIds: true,
                  exactMatch: true,
                },
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data.id > 0, true);

              return done();
            } catch (ex) {
              return done(ex);
            }
          }).
          catch(err => {
            return done(err);
          });
    });
    it('Update a product', function(done) {
      pipedrive.ProductsController.
          findAndSaveProduct({
                body: {
                  name: data.product.name,
                  code: data.product.code,
                },
                params: {
                  term: data.product.name,
                  fieldKey: 'name',
                  returnItemIds: true,
                  exactMatch: true,
                },
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data !== undefined && response.data !== null, true);

              return done();
            } catch (ex) {
              return done(ex);
            }
          }).
          catch(err => {
            return done(err);
          });
    });
  });
});
