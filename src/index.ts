import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';
import { validateEnv } from './validateEnv';

async function init() {
  await useConfig();
  validateEnv();

  const { indexLetters, ...letterPublicExports } = letter;
  await indexLetters();

  return {
    letter: letterPublicExports,
    mail,
  };
}

export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = init;
