import { CONTENT_TYPE_HEADERS, CONTENT_TYPES, ENVS } from './mail.constants';
import { participantMailUtil } from './participant.mail.util';
import type {
  BodyContentType,
  ComposeHeadersOptions,
  SmtpParticipant,
} from './mail.types';

const { ENV } = process.env;

/** Replaces the recipients with you or the configured MACMAIL_PRODUCTION_DEV_RECIPIENT in non-production environments */
function composeToHeader(recipients: SmtpParticipant | SmtpParticipant[]) {
  if (ENV !== ENVS.PRODUCTION) {
    const devRecipient = participantMailUtil.getDevRecipient();
    recipients = devRecipient;
  }
  const toHeader = `To: ${participantMailUtil.formatParticipants(recipients)}`;
  return toHeader;
}

/** Interpolates the configured MACMAIL_PRODUCTION_DEV_RECIPIENT with other BCC recipients in production environments */
function composeBccHeader(
  blindCarbonCopy: SmtpParticipant | SmtpParticipant[] | undefined
) {
  const allBcc: SmtpParticipant[] = [];
  if (Array.isArray(blindCarbonCopy)) {
    blindCarbonCopy.forEach((recipient) => allBcc.push(recipient));
  } else if (blindCarbonCopy) {
    allBcc.push(blindCarbonCopy);
  }
  if (ENV === ENVS.PRODUCTION) {
    const devRecipient = participantMailUtil.getDevRecipient();
    allBcc.push(devRecipient);
  }
  const bccHeader = allBcc.length
    ? `Bcc: ${participantMailUtil.formatParticipants(allBcc)}`
    : null;
  return bccHeader;
}

/** Encodes the subject, just in case it has characters like emojis */
function composeSubjectHeader(subject: string) {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const subjectHeader = `Subject: ${utf8Subject}`;
  return subjectHeader;
}

/** Composes SMTP compliant headers in the following order:
 * 1. From: When using Google as the mail vendor, they will override this with the authenticated user
 * 2. To
 * 3. CC (optional)
 * 4. BCC (optional): but we inject the configured MACMAIL_PRODUCTION_DEV_RECIPIENT in production environments
 * 5. Subject
 * 6. Content-Type headers
 */
function composeHeaders(
  sender: SmtpParticipant,
  recipients: SmtpParticipant | SmtpParticipant[],
  subject: string,
  isMixedContent: boolean,
  bodyContentType: BodyContentType,
  options?: ComposeHeadersOptions
) {
  const fromHeader = `From: ${participantMailUtil.formatParticipant(sender)}`;
  const toHeader = composeToHeader(recipients);
  const headers = [fromHeader, toHeader];
  if (options?.carbonCopy) {
    const ccHeader = `Cc: ${participantMailUtil.formatParticipants(
      options.carbonCopy
    )}`;
    headers.push(ccHeader);
  }
  const bccHeader = composeBccHeader(options?.blindCarbonCopy);
  if (bccHeader) {
    headers.push(bccHeader);
  }
  const subjectHeader = composeSubjectHeader(subject);
  headers.push(subjectHeader);
  const contentTypeHeaders = isMixedContent
    ? CONTENT_TYPE_HEADERS[CONTENT_TYPES.MULTIPART_MIXED]
    : CONTENT_TYPE_HEADERS[bodyContentType];
  contentTypeHeaders.forEach((header) => headers.push(header));
  return headers;
}

export const headerMailUtil = {
  composeBccHeader,
  composeHeaders,
  composeSubjectHeader,
  composeToHeader,
};
