'use strict';

const pipedrive = require('pipedrive');
const PaginationController = require('./PaginationController');
const OrganizationsController = require('./OrganizationsController');

const pd = {
  ...pipedrive,
  PaginationController: PaginationController,
  OrganizationsController: OrganizationsController
}

module.exports = pd;
