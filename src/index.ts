import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';

async function init() {
  await useConfig();
  await letter.indexLetters();
}

export const macmail = {
  init,
  letter,
  mail,
};

export type * from './letter';
export type * from './mail';

export default macmail;
