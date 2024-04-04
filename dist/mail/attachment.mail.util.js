"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentMailUtil = void 0;
const mail_constants_1 = require("./mail.constants");
const promises_1 = __importDefault(require("fs/promises"));
async function buildAttachment(file) {
    const { mimetype, originalname, path } = file;
    const fileBuf = await promises_1.default.readFile(path);
    const fileData = fileBuf.toString('base64');
    const attachment = {
        data: fileData,
        mimeType: mimetype,
        name: originalname,
    };
    return attachment;
}
async function buildAttachments(files) {
    const attachments = await Promise.all(files.map((file) => buildAttachment(file)));
    return attachments;
}
function composeAttachment(attachmentFile, isFinalAttachment) {
    const contentTypeHeader = `Content-Type: ${attachmentFile.mimeType}`;
    const contentDispositionHeader = `Content-Disposition: attachment; filename="${attachmentFile.name}"`;
    const boundary = isFinalAttachment ? mail_constants_1.BOUNDARY.END : mail_constants_1.BOUNDARY.NEXT;
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
function composeAttachments(attachments) {
    if (Array.isArray(attachments)) {
        const numAttachments = attachments.length;
        const attachmentLines = attachments.reduce((acc, attachment, index) => {
            const isFinalAttachment = index === numAttachments - 1;
            const nextAttachmentLines = composeAttachment(attachment, isFinalAttachment);
            return [...acc, ...nextAttachmentLines];
        }, []);
        return attachmentLines;
    }
    const isFinalAttachment = true;
    const attachmentLines = composeAttachment(attachments, isFinalAttachment);
    return attachmentLines;
}
exports.attachmentMailUtil = {
    buildAttachment,
    buildAttachments,
    composeAttachment,
    composeAttachments,
};
