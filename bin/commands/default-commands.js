// Inquirer engine.
const { isCleanGitRepo, promptUser } = require('../../lib/global/utils');
const migrate = require('./migrate');
const transform = require('./transform');
const migrateApi = require('./api');

const defaultTransform = async (type, path) => {
  await isCleanGitRepo(process.cwd());
  await transform(type, path);
};

const defaultMigrate = async () => {
  const { type, path } = await promptUser();
  await migrate(type, path);
};

const defaultApi = async () => {
  const { type, path } = await promptUser();
  await migrateApi(type, path);
}

// Prompt's configuration
const promptOptions = [
  {
    type: 'list',
    name: 'type',
    message: 'What would you like to do?',
    choices: [
      { name: 'Migrate', value: 'migrate' },
      { name: 'Transform', value: 'transform' },
      { name: 'Migrate Api Folder', value: 'api' },
    ],
  },
];

const defaultCommand = async () => {
  try {
    const options = await promptUser(promptOptions);

    switch (options.type) {
      case 'migrate':
        await defaultMigrate();
        break;
      case 'transform':
        await defaultTransform();
        break;
      case 'api':
        await defaultApi();
        break;
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  defaultCommand,
  defaultMigrate,
  defaultTransform,
};
