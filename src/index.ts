import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';
import { validateEnv } from './validateEnv';

// `indexLetters` is not intended for external invocation.
const { indexLetters, ...letterPublicExports } = letter;

async function main() {
  await useConfig();
  validateEnv();
  await indexLetters();
}

main();

/** @warning Do NOT use this as a named import! The named export only exists for type completion. Use this as a default import */
export const macmail = {
  letter: letterPublicExports,
  mail,
};

export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = macmail;
