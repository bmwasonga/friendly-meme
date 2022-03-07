'use strict';
const { Model } = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Task.belongsTo(models.User, {
				as: 'User',
				foreignKey: 'userId',
				constraints: false,
			});
		}
	}
	Task.init(
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER,
			},
			clientName: DataTypes.STRING,
			clientPhone: DataTypes.STRING,
			completed: DataTypes.BOOLEAN,
			// userId: DataTypes.INTEGER,
			inProgress: DataTypes.BOOLEAN,
			taskDescription: DataTypes.STRING,
			comment: DataTypes.STRING,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Task',
			tableName: 'Tasks',
			// freezeTableName: true,
		}
	);

	return Task;
};
