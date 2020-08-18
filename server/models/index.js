let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename('./index.js');
let env = process.env.NODE_ENV || 'development';
let config = require('../config/config')[env];
let db = {};
let dotenv = require('dotenv');

dotenv.config();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(function (file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  db.Role.hasMany(db.User, {
    foreignKey: 'RoleId',
    as: 'user',
  });

  db.User.hasMany(db.Document, {
    foreignKey: 'OwnerId',
    onDelete: 'CASCADE',
    as: 'documents',
  });

  db.User.belongsTo(db.Role, {
    foreignKey: 'RoleId',
    onDelete: 'CASCADE',
    as: 'role',
  });

  db.Document.belongsTo(db.User, {
    foreignKey: 'OwnerId',
    onDelete: 'CASCADE',
    as: 'owner',
  });
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
