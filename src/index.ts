import { letter as _letter } from './letter';
import { mail as _mail } from './mail';
import { useConfig } from './useConfig';
import { validateEnv } from './validateEnv';

// `indexLetters` is not intended for external invocation.
const { indexLetters, ...letterPublicExports } = _letter;

async function main() {
  await useConfig();
  validateEnv();
  await indexLetters();
}

main();

const letter = letterPublicExports;
const mail = _mail;

const macmail = {
  letter,
  mail,
};

export type { mail, letter };
export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = macmail;
