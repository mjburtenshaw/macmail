import { LETTER_NAME } from './Test.letter';
import { renderLetter } from './letter.util';
import * as constants from './letter.constants';

export type * from './letter.types';

export const letterUtil = { LETTER_NAME, renderLetter, ...constants };
