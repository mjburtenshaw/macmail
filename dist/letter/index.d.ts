import { render } from './letter.util';
export type * from './letter.types';
export declare const letter: {
    indexLetters(): Promise<void>;
    LETTERS: import("./letter.types").Letters;
    render: typeof render;
};
