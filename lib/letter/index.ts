import { LETTER_NAME } from './Test.letter';
import { render } from './letter.util';
import * as constants from './letter.constants';

export type * from './letter.types';

export const letter = { LETTER_NAME, render, ...constants };
