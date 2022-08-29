'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('todo', {
         id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER
         },
         title: {
             type: Sequelize.STRING
         },
         activity_group_id: {
             type: Sequelize.INTEGER
         },
         is_active: {
             type: Sequelize.BOOLEAN
         },
         priority: {
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

     await queryInterface.dropTable('todo');
  }
};
