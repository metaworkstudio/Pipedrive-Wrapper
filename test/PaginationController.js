require('dotenv').config();
const assert = require('assert');
const pipedrive = require('../src');
pipedrive.Configuration.apiToken = process.env.API_TOKEN;
const paginationLimit = parseInt(process.env.TEST_PAGINATION_LIMIT);

describe('PaginationController', function() {
  it('#all()', function(done) {
    this.timeout(10000);

    pipedrive.PaginationController.all(pipedrive.PersonsController.getAllPersons, {limit: paginationLimit}).
        then(response => {
          try {
            assert.strictEqual(response.data.length > paginationLimit, true);

            done();
          } catch (ex) {
            done(ex);
          }
        }).
        catch(ex => {
          done(ex);
        });
  });
});
