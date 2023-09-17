"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageMailUtil = void 0;
const attachment_mail_util_1 = require("./attachment.mail.util");
const body_mail_util_1 = require("./body.mail.util");
const mail_constants_1 = require("./mail.constants");
const header_mail_util_1 = require("./header.mail.util");
function composeMessage(sender, recipients, subject, requestedLetter, options) {
    const isMixedContent = !!options?.attachments;
    const bodyContentType = options?.bodyContentType || mail_constants_1.CONTENT_TYPES.TEXT_PLAIN;
    const letterLines = [];
    const headers = header_mail_util_1.headerMailUtil.composeHeaders(sender, recipients, subject, isMixedContent, bodyContentType, options);
    headers.forEach((header) => letterLines.push(header));
    const bodyLines = body_mail_util_1.bodyMailUtil.composeBody(isMixedContent, bodyContentType, requestedLetter);
    bodyLines.forEach((bodyLine) => letterLines.push(bodyLine));
    if (options?.attachments) {
        const attachmentLines = attachment_mail_util_1.attachmentMailUtil.composeAttachments(options.attachments);
        attachmentLines.forEach((attachmentLine) => letterLines.push(attachmentLine));
    }
    const message = letterLines.join('\n');
    return message;
}
exports.messageMailUtil = { composeMessage };
