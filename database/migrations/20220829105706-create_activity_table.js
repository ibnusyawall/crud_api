'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('activities', {
         id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER
         },
         email: {
             type: Sequelize.STRING
         },
         title: {
             type: Sequelize.STRING
         },
         created_at: {
             type: Sequelize.DATE,
             defaultValue: new Date()
         },
         updated_at: {
             allowNull: true,
             type: Sequelize.DATE
         },
         deleted_at: {
             allowNull: true,
             type: Sequelize.DATE
         }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('activities');
  }
};
