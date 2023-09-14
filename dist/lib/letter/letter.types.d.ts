/// <reference types="react" />
import reactEmail from '@react-email/render';
export type LetterModule = {
    LETTER_NAME: string;
    requiredProps: string[];
    string: () => JSX.Element;
};
export type Letter = {
    Component: <P>(...props: P[]) => JSX.Element;
    requiredProps: string[];
};
export type Letters = {
    [key: string]: Letter;
};
export type LetterProps = {
    [key: string]: any;
};
export type RequestedLetter = {
    name: string;
    props?: LetterProps;
};
export type RenderLetterOptions = reactEmail.Options & Partial<{}>;
