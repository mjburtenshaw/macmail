import type { LetterProps, RenderLetterOptions, RequestedLetter } from './letter.types';
import * as reactEmail from '@react-email/render';
export declare function validateProps(props: LetterProps | undefined, requiredProps: string[], letterName: string): void;
/** Extracts reactEmail.Options from RenderLetterOptions */
export declare function buildRenderOptions(options: RenderLetterOptions | undefined): reactEmail.Options;
export declare function render(requestedLetter: RequestedLetter, options?: RenderLetterOptions): string;
