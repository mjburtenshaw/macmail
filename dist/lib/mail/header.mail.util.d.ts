import type { BodyContentType, ComposeHeadersOptions, SmtpParticipant } from './mail.types';
/** Replaces the recipients with you or the configured PRODUCTION_DEV_RECIPIENT in non-production environments */
declare function composeToHeader(recipients: SmtpParticipant | SmtpParticipant[]): string;
/** Interpolates the configured PRODUCTION_DEV_RECIPIENT with other BCC recipients in production environments */
declare function composeBccHeader(blindCarbonCopy: SmtpParticipant | SmtpParticipant[] | undefined): string;
/** Encodes the subject, just in case it has characters like emojis */
declare function composeSubjectHeader(subject: string): string;
/** Composes SMTP compliant headers in the following order:
 * 1. From: When using Google as the mail vendor, they will override this with the authenticated user
 * 2. To
 * 3. CC (optional)
 * 4. BCC (optional): but we inject the configured PRODUCTION_DEV_RECIPIENT in production environments
 * 5. Subject
 * 6. Content-Type headers
 */
declare function composeHeaders(sender: SmtpParticipant, recipients: SmtpParticipant | SmtpParticipant[], subject: string, isMixedContent: boolean, bodyContentType: BodyContentType, options?: ComposeHeadersOptions): string[];
export declare const headerMailUtil: {
    composeBccHeader: typeof composeBccHeader;
    composeHeaders: typeof composeHeaders;
    composeSubjectHeader: typeof composeSubjectHeader;
    composeToHeader: typeof composeToHeader;
};
export {};
