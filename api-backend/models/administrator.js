const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define('administrator', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if(value) this.setDataValue('password', bcrypt.hashSync(value, saltRounds))
      }
    },
    corporation: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    surname: {
      type: DataTypes.STRING
    },
    ageGroup: {
      type: DataTypes.STRING
    },
    sex: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    education: {
      type: DataTypes.STRING
    },
    income: {
      type: DataTypes.STRING
    }
  });

  return Administrator;
};
