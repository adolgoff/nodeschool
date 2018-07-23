'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    width: DataTypes.REAL,
    height: DataTypes.REAL,
    depth: DataTypes.REAL,
    reviews: DataTypes.ARRAY(DataTypes.TEXT),
    description: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    price: DataTypes.REAL,
    tags: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
