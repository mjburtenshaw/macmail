import { attachmentMailUtil } from './attachment.mail.util';
import { messageMailUtil } from './message.mail.util';
import { participantMailUtil } from './participant.mail.util';
import * as constants from './mail.constants';

export type * from './mail.types';

export const mail = {
  ...constants,
  buildAttachment: attachmentMailUtil.buildAttachment,
  composeMessage: messageMailUtil.composeMessage,
  isMailAddress: participantMailUtil.isMailAddress,
  isSmtpParticipant: participantMailUtil.isSmtpParticipant,
};
