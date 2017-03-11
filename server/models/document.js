'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
         Document.belongsTo(models.User);
      }
    }
  });
  return Document;
};
