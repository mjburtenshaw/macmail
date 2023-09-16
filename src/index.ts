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
  module.exports = {
    letter,
    mail,
  };
});
