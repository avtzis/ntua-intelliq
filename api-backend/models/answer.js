module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    }
  });

  return Answer;
};
