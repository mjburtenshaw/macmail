import { attachmentMailUtil } from './attachment.mail.util';
import { bodyMailUtil } from './body.mail.util';
import { CONTENT_TYPES } from './mail.constants';
import { headerMailUtil } from './header.mail.util';
import type { ComposeMessageOptions, SmtpParticipant } from './mail.types';
import type { RequestedLetter } from '../letter';

export function composeMessage(
  sender: SmtpParticipant,
  recipients: SmtpParticipant | SmtpParticipant[],
  subject: string,
  requestedLetter: RequestedLetter,
  options?: ComposeMessageOptions
) {
  const isMixedContent = !!options?.attachments;
  const bodyContentType = options?.bodyContentType || CONTENT_TYPES.TEXT_PLAIN;
  const letterLines: string[] = [];
  const headers = headerMailUtil.composeHeaders(
    sender,
    recipients,
    subject,
    isMixedContent,
    bodyContentType,
    options
  );
  headers.forEach((header) => letterLines.push(header));
  const bodyLines = bodyMailUtil.composeBody(
    isMixedContent,
    bodyContentType,
    requestedLetter
  );
  bodyLines.forEach((bodyLine) => letterLines.push(bodyLine));
  if (options?.attachments) {
    const attachmentLines = attachmentMailUtil.composeAttachments(
      options.attachments
    );
    attachmentLines.forEach((attachmentLine) =>
      letterLines.push(attachmentLine)
    );
  }
  const message = letterLines.join('\n');
  return message;
}

const messageMailUtil = { composeMessage };
