require('dotenv').config();
const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;

const data = {
  deal: {
    title: '[TEST] test deal for testing',
  },
};

describe('DealsController', function() {
  function beforeAndAfterSuit(done) {
    pipedrive.ItemsController.searchItemByField({
      term: data.deal.title,
      fieldType: 'dealField',
      exactMatch: true,
      fieldKey: 'title',
      returnItemIds: true,
      limit: 1,
    }).
        then(response => {
          try {
            if (response.data.length === 0) {
              return done();
            }

            pipedrive.DealsController.deleteADeal(response.data[0].id).
                then(() => done());
          } catch (ex) {
            return done(ex);
          }
        });
  }

  describe('#findOrCreateDeal()', function() {
    before('Remove a test deal before the start', beforeAndAfterSuit);
    after('Remove a test deal before the start', beforeAndAfterSuit);

    it('Create a deal', function(done) {
      pipedrive.DealsController.
          findOrCreateDeal({
                body: {
                  title: data.deal.title,
                },
                params: {
                  term: data.deal.title,
                  fieldKey: 'title',
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
    it('Find a deal', function(done) {
      pipedrive.DealsController.
          findOrCreateDeal({
                body: {
                  title: data.deal.title,
                },
                params: {
                  term: data.deal.title,
                  fieldKey: 'title',
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

  describe('#findAndSaveDeal()', function() {
    before('Remove a test deal before the start', beforeAndAfterSuit);
    after('Remove a test deal before the start', beforeAndAfterSuit);

    it('Create a deal', function(done) {
      pipedrive.DealsController.
          findAndSaveDeal({
                body: {
                  title: data.deal.title,
                },
                params: {
                  term: data.deal.title,
                  fieldKey: 'title',
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
    it('Update a deal', function(done) {
      pipedrive.DealsController.
          findAndSaveDeal({
                body: {
                  title: data.deal.title,
                },
                params: {
                  term: data.deal.title,
                  fieldKey: 'title',
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
  });
});
