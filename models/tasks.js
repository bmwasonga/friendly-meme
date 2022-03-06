'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tasks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.userId = this.belongsTo(models.User, {
				foreignKey: 'id',
			});
		}
	}
	Channel.init(
		{
			// id: DataTypes.INTEGER,
			client_name: DataTypes.STRING,
			client_lastName: DataTypes.STRING,
			client_phone: DataTypes.STRING,
			completed: DataTypes.BOOLEAN,
			task_id: DataTypes.INTEGER,
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			date_assigned: DataTypes.DATE,
			date_completed: DataTypes.DATE,
			date_created: DataTypes.DATE,
			in_progress: DataTypes.BOOLEAN,
			task_description: DataTypes.STRING,
			paid: DataTypes.BOOLEAN,
			comment: DataTypes.STRING,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Tasks',
			tableName: 'Tasks',
			freezeTableName: true,
		}
	);
	return Tasks;
};
