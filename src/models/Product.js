const BaseModel = require('pipedrive/lib/Models/BaseModel');

class Product extends BaseModel {
  /**
   * @constructor
   * @param   {Object}  obj    The object passed to constructor
   */
  constructor(obj) {
    super(obj);
    if (obj === undefined || obj === null) return;
    this.name = this.constructor.getValue(obj.name);
    this.code = this.constructor.getValue(obj.code);
    this.unit = this.constructor.getValue(obj.unit);
    this.tax = this.constructor.getValue(obj.tax, 0);
    this.active_flag = this.constructor.getValue(obj.active_flag);
    this.visible_to = this.constructor.getValue(obj.visible_to);
    this.owner_id = this.constructor.getValue(obj.owner_id);
    this.prices = this.constructor.getValue(obj.prices);
  }

  /**
   * Function containing information about the fields of this model
   * @return   {array}   Array of objects containing information about the fields
   */
  static mappingInfo() {
    return super.mappingInfo().concat([
      { name: 'success', realName: 'success' },
      { name: 'data', realName: 'data', array: true },
    ]);
  }

  /**
   * Function containing information about discriminator values
   * mapped with their corresponding model class names
   *
   * @return   {object}  Object containing Key-Value pairs mapping discriminator
   *                     values with their corresponding model classes
   */
  static discriminatorMap() {
    return {};
  }
}

module.exports = Product;
