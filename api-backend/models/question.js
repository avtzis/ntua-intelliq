module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    required: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    answerType: {
      type: DataTypes.STRING,
      defaultValue: 'options'
    },
    qID: {
      type: DataTypes.STRING
    }
  });

  return Question;
};
