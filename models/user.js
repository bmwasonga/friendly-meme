'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.id = this.hasMany(models.Task, {
				foreignKey: 'user_id',
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			phone: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password: DataTypes.STRING,
			role: {
				type: DataTypes.ENUM,
				values: ['admin', 'tasker', 'client'],
				defaultValue: 'tasker',
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
