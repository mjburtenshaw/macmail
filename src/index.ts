import { useConfig } from './useConfig';

let letter: any;
let mail: any;

async function initialize() {
  await useConfig();

  const letterModule = require('./letter');
  const mailModule = require('./mail');

  letter = letterModule.letter;
  mail = mailModule.mail;
}

initialize().then(() => {
  exports.macmail = {
    letter,
    mail,
  };
  exports.default = exports.macmail;
});

export type * from './letter';
export type * from './mail';
