module.exports = (sequelize, DataTypes) => {
  const Researcher = sequelize.define('researcher', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    corporation: {
      type: DataTypes.STRING
    }
  });

  return Researcher;
};
