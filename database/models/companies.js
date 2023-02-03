'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companies.init({
    companyName: DataTypes.STRING,
    companyID: DataTypes.UUID,
    ceo: DataTypes.STRING,
    score: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Companies',
  });
  return Companies;
};