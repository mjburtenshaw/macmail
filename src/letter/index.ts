import * as constants from './letter.constants';
import { indexLetters } from './letter.constants';
import { render } from './letter.util';

export type * from './letter.types';

export const letter = { indexLetters, render, ...constants };
