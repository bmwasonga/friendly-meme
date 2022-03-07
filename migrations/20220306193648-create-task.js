'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			phone: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		await queryInterface.createTable('Tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			clientName: {
				type: Sequelize.STRING,
			},
			clientPhone: {
				type: Sequelize.STRING,
			},
			completed: {
				type: Sequelize.BOOLEAN,
			},
			userId: {
				type: Sequelize.INTEGER,
				// references: {
				// 	model: 'Users',
				// 	key: 'id',
				// },
			},
			inProgress: {
				type: Sequelize.BOOLEAN,
			},
			taskDescription: {
				type: Sequelize.STRING,
			},
			comment: {
				type: Sequelize.STRING,
			},
			location: {
				type: Sequelize.STRING,
			},
			dateAssigned: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropAllTables();
	},
};
