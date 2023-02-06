'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  companyData.init({
    companyName: DataTypes.STRING,
    companyId: DataTypes.UUID,
    ceo: DataTypes.STRING,
    score: DataTypes.REAL,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companyData',
  });
  return companyData;
};