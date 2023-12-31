module.exports = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('questionnaire', {
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
    about: {
      type: DataTypes.TEXT
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    questionnaireID: {
      type: DataTypes.STRING
    }
  });

  return Questionnaire;
};
