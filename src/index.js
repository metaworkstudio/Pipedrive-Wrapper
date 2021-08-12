'use strict';

const pipedrive = require('pipedrive');
const Product = require('./models/Product')
const PaginationController = require('./PaginationController');
const OrganizationsController = require('./OrganizationsController');
const PersonsController = require('./PersonsController');
const DealsController = require('./DealsController');
const ProductsController = require('./ProductsController');

pipedrive.Product.mappingInfo = Product.mappingInfo;

const pd = {
  ...pipedrive,
  PaginationController,
  OrganizationsController,
  PersonsController,
  DealsController,
  ProductsController,
};

module.exports = pd;
