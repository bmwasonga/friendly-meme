'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.id = this.belongsTo(models.User, {
				foreignKey: 'id',
				as: 'User',
			});
		}
	}
	Task.init(
		{
			clientName: DataTypes.STRING,
			clientPhone: DataTypes.STRING,
			completes: DataTypes.BOOLEAN,
			userId: DataTypes.INTEGER,
			inProgress: DataTypes.BOOLEAN,
			taskDescription: DataTypes.STRING,
			comment: DataTypes.STRING,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Task',
			// freezeTableName: true,
		}
	);
	return Task;
};
