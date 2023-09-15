import type { AttachmentFile, BuildAttachmentFile } from './mail.types';
declare function buildAttachment(file: BuildAttachmentFile): Promise<AttachmentFile>;
declare function buildAttachments(files: BuildAttachmentFile[]): Promise<AttachmentFile[]>;
declare function composeAttachment(attachmentFile: AttachmentFile, isFinalAttachment: boolean): string[];
declare function composeAttachments(attachments: AttachmentFile | AttachmentFile[]): string[];
export declare const attachmentMailUtil: {
    buildAttachment: typeof buildAttachment;
    buildAttachments: typeof buildAttachments;
    composeAttachment: typeof composeAttachment;
    composeAttachments: typeof composeAttachments;
};
export {};
