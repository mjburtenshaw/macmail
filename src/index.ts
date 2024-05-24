import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';

useConfig();

function validateEnv() {
  const booleanEnvs = ['MACMAIL_OVERRIDE_RECIPIENTS'];
  booleanEnvs.forEach((booleanEnv) => {
    const bool = JSON.parse(process.env[booleanEnv]);
    if (typeof bool !== 'boolean') {
      throw new Error(
        `💀  ${booleanEnv} [${process.env[booleanEnv]}] is not valid. Should be true or false`
      );
    }
  });

  const emailEnvs = ['MACMAIL_PRODUCTION_DEV_RECIPIENT'];
  emailEnvs.forEach((emailEnv) => {
    const value = process.env[emailEnv];
    if (!value.includes('@') || !value.includes('.')) {
      throw new Error(
        `💀  ${emailEnv} [${value}] is not valid. Should be email-like (me@example.com)`
      );
    }
  });

  const nodeEnvs = ['development', 'test', 'production'];
  if (!nodeEnvs.includes(process.env.NODE_ENV)) {
    throw new Error(
      `💀  NODE_ENV [${
        process.env.NODE_ENV
      }] is not valid. Should be one of [${nodeEnvs.join(', ')}]`
    );
  }

  const otherEnvs = ['MACMAIL_SOURCE_DIR'];
  otherEnvs.forEach((otherEnv) => {
    if (!process.env[otherEnv]) {
      throw new Error(`💀  ${otherEnv} is not present or blank.`);
    }
  });
}

validateEnv();

export const macmail = {
  letter,
  mail,
};

export type * from './letter';
export type * from './mail';

// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = macmail;
