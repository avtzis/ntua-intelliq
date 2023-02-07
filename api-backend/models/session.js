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
      defaultValue: 'false'
    },
    submitted: {
      type: DataTypes.STRING,
      defaultValue: 'false'
    },
    ses: {
      type: DataTypes.STRING
    }
  });

  return Session;
};
