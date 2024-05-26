import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';
import { validateEnv } from './validateEnv';

// `indexLetters` is not intended for external invocation.
const { indexLetters, ...letterPublicExports } = letter;

async function main() {
  await useConfig();
  validateEnv();
  indexLetters();
}

main();

export const macmail = {
  letter: letterPublicExports,
  mail,
};

export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = macmail;
