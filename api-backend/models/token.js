module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('token', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      username: {
        type: DataTypes.STRING,
      }
    });
  
    return Token;
  };  