const { join } = require('path');
const fs = require('fs-extra');

const updateControllers = async (apiPath, apiName) => {
  
  const v4ControllersPath = join(apiPath, 'controllers', `${apiName}.js`);
  
  await fs.ensureFileSync(v4ControllersPath);
  const file = fs.createWriteStream(v4ControllersPath)

  file.write("const { createCoreController } = require('@strapi/strapi').factories\n\n")
  file.write(`module.exports = createCoreController('api::${apiName}.${apiName}')`)
  file.end();

};

module.exports = updateControllers;