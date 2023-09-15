import { letter } from './letter';
import { mail } from './mail';
import { useConfig } from './useConfig';

useConfig();

export const macmail = {
  letter,
  mail,
};

export default macmail;
