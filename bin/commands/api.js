// Node.js core
const { resolve } = require('path');

const fs = require('fs-extra');
const chalk = require('chalk');

// Migration Helpers
const { v4 } = require('../../lib');

const { migratePlugin, migrateApiFolder, migrateDependencies } = v4.migrationHelpers;

// Global utils
const { isPathStrapiApp, logger, isCleanGitRepo, promptUser } = require('../../lib/global/utils');

const migrateApi = async (type, path, pathForV4Plugin) => {
  // Check the path exists
  const exists = await fs.pathExists(resolve(path));
  if (!exists) {
    logger.error(`${chalk.yellow(resolve(path))} does not exist`);
    process.exit(1)
  }

  const projectPath = path || options.path;

  try {
    await migrateApiFolder(projectPath);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = migrateApi;
