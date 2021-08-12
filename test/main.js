const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;

const data = {
  organization: {
    name: '[TEST] test organization for testing',
  },
};

describe('OrganizationsController', function() {
  function beforeAndAfterSuit(done) {
    pipedrive.ItemsController.searchItemByField({
      term: data.organization.name,
      fieldType: 'organizationField',
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

            pipedrive.OrganizationsController.deleteAnOrganization(response.data[0].id).
                then(() => done());
          } catch (ex) {
            return done(ex);
          }
        });
  }

  describe('#findAndSaveOrganization()', function() {
    before('Remove a test organization before the start', beforeAndAfterSuit);
    after('Remove a test organization before the start', beforeAndAfterSuit);

    it('Create an organization', function(done) {
      pipedrive.OrganizationsController.
          findAndSaveOrganization({
                organization: {
                  name: data.organization.name,
                },
                params: {
                  term: data.organization.name,
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
    it('Find an organization', function(done) {
      pipedrive.OrganizationsController.
          findAndSaveOrganization({
                organization: {
                  name: data.organization.name,
                },
                params: {
                  term: data.organization.name,
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

  describe('#findAndSaveOrganization()', function() {
    before('Remove a test organization before the start', beforeAndAfterSuit);
    after('Remove a test organization before the start', beforeAndAfterSuit);

    it('Create an organization', function(done) {
      pipedrive.OrganizationsController.
          findAndSaveOrganization({
                organization: {
                  name: data.organization.name,
                },
                params: {
                  term: data.organization.name,
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
    it('Update an organization', function(done) {
      pipedrive.OrganizationsController.
          findAndSaveOrganization({
                organization: {
                  name: data.organization.name,
                },
                params: {
                  term: data.organization.name,
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

