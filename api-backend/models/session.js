module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    finished: {
      type: DataTypes.STRING,
      default: 'false'
    },
    submitted: {
      type: DataTypes.STRING,
      default: 'false'
    }
  });

  return Session;
};
