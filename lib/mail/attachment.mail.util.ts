import { BOUNDARY } from './mail.constants';
import fs from 'fs/promises';
import type { AttachmentFile, BuildAttachmentFile } from './mail.types';

async function buildAttachment(file: BuildAttachmentFile) {
  const { destination, filename, mimetype, originalname } = file;
  const cwd = process.cwd();
  // destination is suffixed with a slash by Multer
  const fileUri = `${cwd}/${destination}${filename}`;
  const fileBuf = await fs.readFile(fileUri);
  const fileData = fileBuf.toString('base64');
  const attachment: AttachmentFile = {
    data: fileData,
    mimeType: mimetype,
    name: originalname,
  };
  return attachment;
}

async function buildAttachments(files: BuildAttachmentFile[]) {
  const attachments = await Promise.all(
    files.map((file) => buildAttachment(file))
  );
  return attachments;
}

function composeAttachment(
  attachmentFile: AttachmentFile,
  isFinalAttachment: boolean
) {
  const contentTypeHeader = `Content-Type: ${attachmentFile.mimeType}`;
  const contentDispositionHeader = `Content-Disposition: attachment; filename="${attachmentFile.name}"`;
  const boundary = isFinalAttachment ? BOUNDARY.END : BOUNDARY.NEXT;
  const attachments = [
    contentTypeHeader,
    'MIME-Version: 1.0',
    'Content-Transfer-Encoding: base64',
    contentDispositionHeader,
    '',
    attachmentFile.data,
    '',
    boundary,
  ];
  return attachments;
}

function composeAttachments(attachments: AttachmentFile | AttachmentFile[]) {
  if (Array.isArray(attachments)) {
    const numAttachments = attachments.length;
    const attachmentLines = attachments.reduce((acc, attachment, index) => {
      const isFinalAttachment = index === numAttachments - 1;
      const nextAttachmentLines = composeAttachment(
        attachment,
        isFinalAttachment
      );
      return [...acc, ...nextAttachmentLines];
    }, [] as string[]);
    return attachmentLines;
  }
  const isFinalAttachment = true;
  const attachmentLines = composeAttachment(attachments, isFinalAttachment);
  return attachmentLines;
}

export const attachmentMailUtil = {
  buildAttachment,
  buildAttachments,
  composeAttachment,
  composeAttachments,
};
