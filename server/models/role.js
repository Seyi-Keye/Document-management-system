module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasOne(models.User);
      }
    }
  });
  return Role;
};
