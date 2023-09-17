import type { ComposeMessageOptions, SmtpParticipant } from './mail.types';
import type { RequestedLetter } from '../letter';
declare function composeMessage(sender: SmtpParticipant, recipients: SmtpParticipant | SmtpParticipant[], subject: string, requestedLetter: RequestedLetter, options?: ComposeMessageOptions): string;
export declare const messageMailUtil: {
    composeMessage: typeof composeMessage;
};
export {};
