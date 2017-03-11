const bcrypt = require('bcrypt');
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

      instanceMethods: {
        confirmPassword() {
          if (this.password !== this.passwordConfirmation) {
            throw new Error('Password does not match')
          }
          return true;
        },

      /**
       * Compare plain password to user's hashed password
       * @method
       * @param {String} password
       * @returns {Boolean} password match
       */
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash user's password
       * @method
       * @returns {void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate(user) {
        if (user.confirmPassword()) {
        user.hashPassword();
        }
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};
