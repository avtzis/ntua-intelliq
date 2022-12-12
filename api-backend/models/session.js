module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    }
  });

  return Session;
};
