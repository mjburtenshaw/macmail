import { type RequestedLetter } from '../letter';
import type { BodyContentType } from './mail.types';
declare function composeBody(isMixedContent: boolean, bodyContentType: BodyContentType, requestedLetter: RequestedLetter): string[];
export declare const bodyMailUtil: {
    composeBody: typeof composeBody;
};
export {};
