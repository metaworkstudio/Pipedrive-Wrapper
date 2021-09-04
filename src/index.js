'use strict';

const pipedrive = require('pipedrive');
const Product = require('./Models/Product');
const PaginationController = require('./Controllers/PaginationController');
const OrganizationsController = require('./Controllers/OrganizationsController');
const PersonsController = require('./Controllers/PersonsController');
const DealsController = require('./Controllers/DealsController');
const ProductsController = require('./Controllers/ProductsController');
const ActivitiesController = require('./Controllers/ActivitiesController');

pipedrive.Product.mappingInfo = Product.mappingInfo;

const pd = {
  ...pipedrive,
  PaginationController,
  OrganizationsController,
  PersonsController,
  DealsController,
  ProductsController,
  ActivitiesController,
};

module.exports = pd;
