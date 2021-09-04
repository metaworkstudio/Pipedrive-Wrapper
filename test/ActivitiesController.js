require('dotenv').config();
const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;

const data = {
  person: {
    name: '[TEST] test person for testing',
  },
  activity: {
    subject: '[TEST] test activity for testing',
  },
};

describe('ActivitiesController', function() {
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

  describe('#save()', function() {
    before('Remove a test person before the start', beforeAndAfterSuit);
    after('Remove a test person before the start', beforeAndAfterSuit);

    it('Create a person', function(done) {
      pipedrive.PersonsController.
          findOrCreatePerson({
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

    it('Create an activity', function(done) {
      pipedrive.ActivitiesController.
          save({
                subject: data.activity.subject,
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data.id > 0, true);

              data.activity.id = response.data.id;

              return done();
            } catch (ex) {
              return done(ex);
            }
          }).
          catch(err => {
            return done(err);
          });
    });
    it('Edit an activity', function(done) {
      pipedrive.ActivitiesController.
          save({
                id: data.activity.id,
                subject: data.activity.subject,
              },
          ).
          then(response => {
            try {
              assert.strictEqual(response.data.id > 0, true);

              data.activity.id = response.data.id;

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
