import { promises as fsPromises } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

type MacmailConfig = {
  [key: string]: string;
};

async function readConfig() {
  const configFilePath = path.resolve(process.cwd(), 'macmail.config.yml');
  try {
    const rawConfig = await fsPromises.readFile(configFilePath, 'utf8');
    const config = yaml.load(rawConfig) as MacmailConfig;
    return config;
  } catch (err) {
    throw new Error(`macmail: 💀  Error reading configuration: ${err.message}`);
  }
}

function applyConfig(config: MacmailConfig) {
  try {
    const foundKeys: string[] = [];
    for (const key in config) {
      if (Object.hasOwnProperty.call(config, key)) {
        const macmailKey = `MACMAIL_${key.toUpperCase()}`;
        const configValue = config[key];
        process.env[macmailKey] = configValue;
        foundKeys.push(macmailKey);
      }
    }
    const requiredKeys = [
      'MACMAIL_OVERRIDE_RECIPIENTS',
      'MACMAIL_PRODUCTION_DEV_RECIPIENT',
      'MACMAIL_SOURCE_DIR',
    ];
    requiredKeys.forEach((requiredKey) => {
      if (!foundKeys.includes(requiredKey)) {
        throw new Error(
          `Missing required config ${requiredKey}: Please add this to your macmail.config.yml file.`
        );
      }
    });
  } catch (err) {
    throw new Error(
      `macmail: 💀  Error applying configuration: ${err.message}`
    );
  }
}

async function useConfig() {
  if (process.env.NODE_ENV !== 'test') {
    const config = await readConfig();
    applyConfig(config);
  }
}

export { useConfig };
