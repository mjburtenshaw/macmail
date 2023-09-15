import type { ComposeMessageOptions, SmtpParticipant } from './mail.types';
import type { RequestedLetter } from '../letter';
export declare function composeMessage(sender: SmtpParticipant, recipients: SmtpParticipant | SmtpParticipant[], subject: string, requestedLetter: RequestedLetter, options?: ComposeMessageOptions): string;
