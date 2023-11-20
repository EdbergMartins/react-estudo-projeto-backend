'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DebitValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DebitValue.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DebitValue',
  });
  return DebitValue;
};