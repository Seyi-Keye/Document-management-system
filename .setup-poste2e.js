import models from './server/models';

models.sequelize.sync({
      force: true,
    }).then(() => {});