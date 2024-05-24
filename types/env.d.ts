declare namespace NodeJS {
  interface ProcessEnv {
    MACMAIL_OVERRIDE_RECIPIENTS: string; // boolean
    MACMAIL_PRODUCTION_DEV_RECIPIENT: `${string}@${string}.${string}`;
    MACMAIL_SOURCE_DIR: string;
    NODE_ENV: 'development' | 'test' | 'production';

    MACMAIL_MY_EMAIL_ADDRESS?: `${string}@${string}.${string}`;
    MACMAIL_MY_NAME?: string;
  }
}
