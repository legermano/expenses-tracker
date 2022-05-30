const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
    }
  }
  Expense.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Expense',
      tableName: 'expense',
    }
  );
  return Expense;
};
