const bcrypt = require('bcrypt');

/**
 * Hash user's password
 * @method
 * @returns {void} no return
 */
const hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 * Compare plain password to user's hashed password
 * @method
 * @param {String} password
 * @returns {Boolean} password match
 */
const validPassword = function (password) {
  return bcrypt.compareSync(password, user.password);
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
