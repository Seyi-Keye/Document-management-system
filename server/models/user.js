const bcrypt = require('bcrypt');

/**
 * Hash user's password
 * @method
 * @returns {void} no return
 */
var hashPassword = function (password) {
  console.log('I got here');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          min: 3,
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
        },
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          // model association
          User.hasMany(models.Document, {
            foreignKey: 'OwnerId',
            onDelete: 'CASCADE',
          });
          User.belongsTo(models.Role, {
            foreignKey: 'RoleId',
            onDelete: 'CASCADE',
          });
        },
      },
      instanceMethods: {
        /**
         * Compare plain password to user's hashed password
         * @method
         * @param {String} password
         * @returns {Boolean} password match
         */
        validPassword(password) {
          return bcrypt.compareSync(password, user.password);
        },
      },

      hooks: {
        beforeCreate(user) {
          return hashPassword(user.password);
        },

        beforeUpdate(user) {
          if (user._changed.password) {
            hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
