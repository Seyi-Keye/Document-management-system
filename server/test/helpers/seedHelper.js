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
    db.sequelize.sync({ force: true })
    .then(() => {
      SeedHelper.populateRoleTable();
    });
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
        title: 'regular'
      },
    ];
    return db.Role.bulkCreate(roles);
  }
}

export default SeedHelper.init();
