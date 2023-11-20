'use strict';
/** @type {import('sequelize').Sequelize} */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DebitValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProject: {
        type: Sequelize.STRING,
        references: {
          model: 'projects', // Change this to the correct model name if needed
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valueDescres: {
        type: Sequelize.FLOAT // Assuming you meant FLOAT for decimal values
      },
      motiveDescres: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DebitValues');
  }
};
