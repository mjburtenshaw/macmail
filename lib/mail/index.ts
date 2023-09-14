import { attachmentMailUtil } from './attachment.mail.util';
import { composeMessage } from './message.mail.util';
import { participantMailUtil } from './participant.mail.util';
import * as constants from './mail.constants';

export type * from './mail.types';

export const mailUtil = {
  ...constants,
  buildAttachment: attachmentMailUtil.buildAttachment,
  composeMessage,
  isMailAddress: participantMailUtil.isMailAddress,
};
