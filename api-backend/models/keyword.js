module.exports = (sequelize, DataTypes) => {
    const Keyword = sequelize.define('keyword', {
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
  
    return Keyword;
  };
  