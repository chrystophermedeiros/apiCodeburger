'use strict'

module.exports = {
  up:  async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'category_id',{
        type: Sequelize.INTEGER,
        references: {model: 'Categories', key: 'id'},
        onUpadate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,

    })
  },

  down: async  (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'category_id')
   
  },
}
