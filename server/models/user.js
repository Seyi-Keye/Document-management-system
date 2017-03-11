module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    RoleId: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      // validate:{notNull: true}
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL
    }
  }, {
    classMethods: {
      associate: (models) => {
        // model association
        User.hasMany(models.Document, {
          foreignkey: { allowNull: true }
        });
        User.belongsTo(models.Role, {
          foreignkey: { allowNull: true },
          allowNull: false
        });
      }
    },
  });
  return User;
};
