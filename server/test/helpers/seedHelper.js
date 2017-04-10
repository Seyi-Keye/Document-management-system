import db from '../../models';

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the db
   * @return {Void} - Returns Void
   */
  static init() {
    return db.sequelize.sync({ force: true })
    .then(() => Promise.all([SeedHelper.populateRoleTable(),
      SeedHelper.populateUserTable()]), err =>
      console.log(err, 'this is our error'),
    );
  }

  /**
   * Populates db with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles = [
      {
        title: 'admin',
      },
      {
        title: 'regular',
      },
    ];
    return db.Role.bulkCreate(roles);
  }
  /**
   * Populates db with default user
   * @returns {object} - A Promise object
   */
  static populateUserTable() {
    const user =
      {
        firstname: 'admin',
        lastname: 'admin',
        username: 'admin',
        password: 'password',
        email: 'admin@gmail.com',
        RoleId: 1,
      };
    return db.User.create(user);
  }
}

export default SeedHelper; // .init();
