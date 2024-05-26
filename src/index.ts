import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';
import { validateEnv } from './validateEnv';

async function main() {
  await useConfig();
  validateEnv();
}

main();

export const macmail = {
  letter,
  mail,
};

export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = macmail;
