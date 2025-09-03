'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      image: { type: Sequelize.STRING },
      categoryId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Categories', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('Products', ['categoryId']);
    await queryInterface.addIndex('Products', ['createdAt']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  }
};
