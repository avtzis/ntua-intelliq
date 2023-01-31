module.exports = (sequelize, DataTypes) => {
  const UniqueAnswer = sequelize.define('uniqueAnswer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    context: {
      type: DataTypes.STRING
    }
  });

  return UniqueAnswer;
};
