const { join } = require('path');
const fs = require('fs-extra');

module.exports = async (apiPath, apiName) => {
    const v4ServicePath = join(apiPath, 'services', `${apiName}.js`);
    // Create the js file
    await fs.ensureFile(v4ServicePath);

    // Create write stream for new js file
    const file = fs.createWriteStream(v4ServicePath);

    file.write("const { createCoreService } = require('@strapi/strapi').factories\n\n");
    file.write(`module.exports = createCoreService('api::${apiName}.${apiName}')`);
    file.end();

}
