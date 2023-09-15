import { CONTENT_TYPES } from './mail.constants';
import type { ContentType, ContentTypeKey } from './mail.constants';

export type AttachmentFile = {
  data: string;
  mimeType: string;
  name: string;
};

export type BodyContentType = Exclude<
  ContentType,
  typeof CONTENT_TYPES.MULTIPART_MIXED
>;

export type BuildAttachmentFile = Pick<
  Express.Multer.File,
  'destination' | 'filename' | 'mimetype' | 'originalname'
>;

export type MailAddress = `${string}@${string}.${string}`;

export type UsernameAddressCombo = {
  address: MailAddress;
  username: string;
};

export type SmtpParticipant = MailAddress | UsernameAddressCombo;

export type ComposeHeadersOptions = {
  blindCarbonCopy?: SmtpParticipant | SmtpParticipant[];
  carbonCopy?: SmtpParticipant | SmtpParticipant[];
};

export type ComposeMessageOptions = ComposeHeadersOptions & {
  attachments?: AttachmentFile | AttachmentFile[];
  bodyContentType?: BodyContentType;
};

export type { ContentType, ContentTypeKey };
