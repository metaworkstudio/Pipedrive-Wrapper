require('dotenv').config();
const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;

const data = {
  person: {
    name: '[TEST] test person for testing',
  },
};

describe('PersonsController', function() {
  function beforeAndAfterSuit(done) {
    pipedrive.ItemsController.searchItemByField({
      term: data.person.name,
      fieldType: 'personField',
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

            pipedrive.PersonsController.deleteAPerson(response.data[0].id).
                then(() => done());
          } catch (ex) {
            return done(ex);
          }
        });
  }

  describe('#findAndSavePerson()', function() {
    before('Remove a test person before the start', beforeAndAfterSuit);
    after('Remove a test person before the start', beforeAndAfterSuit);

    it('Create a person', function(done) {
      pipedrive.PersonsController.
          findAndSavePerson({
                body: {
                  name: data.person.name,
                },
                params: {
                  term: data.person.name,
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
    it('Find a person', function(done) {
      pipedrive.PersonsController.
          findAndSavePerson({
                body: {
                  name: data.person.name,
                },
                params: {
                  term: data.person.name,
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
  });

  describe('#findAndSavePerson()', function() {
    before('Remove a test person before the start', beforeAndAfterSuit);
    after('Remove a test person before the start', beforeAndAfterSuit);

    it('Create a person', function(done) {
      pipedrive.PersonsController.
          findAndSavePerson({
                body: {
                  name: data.person.name,
                },
                params: {
                  term: data.person.name,
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
    it('Update a person', function(done) {
      pipedrive.PersonsController.
          findAndSavePerson({
                body: {
                  name: data.person.name,
                },
                params: {
                  term: data.person.name,
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
  });
});
