'use strict';
export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    image: { type: DataTypes.STRING },
    categoryId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Products'
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };
  return Product;
};
