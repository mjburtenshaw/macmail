"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerMailUtil = void 0;
const mail_constants_1 = require("./mail.constants");
const participant_mail_util_1 = require("./participant.mail.util");
const { ENV } = process.env;
/** Replaces the recipients with you or the configured MACMAIL_PRODUCTION_DEV_RECIPIENT in non-production environments */
function composeToHeader(recipients) {
    if (ENV !== mail_constants_1.ENVS.PRODUCTION) {
        recipients = participant_mail_util_1.participantMailUtil.devRecipients;
    }
    const toHeader = `To: ${participant_mail_util_1.participantMailUtil.formatParticipants(recipients)}`;
    return toHeader;
}
/** Interpolates the configured MACMAIL_PRODUCTION_DEV_RECIPIENT with other BCC recipients in production environments */
function composeBccHeader(blindCarbonCopy) {
    const allBcc = [];
    if (Array.isArray(blindCarbonCopy)) {
        blindCarbonCopy.forEach((recipient) => allBcc.push(recipient));
    }
    else if (blindCarbonCopy) {
        allBcc.push(blindCarbonCopy);
    }
    if (ENV === mail_constants_1.ENVS.PRODUCTION) {
        participant_mail_util_1.participantMailUtil.devRecipients.forEach((devRecipient) => allBcc.push(devRecipient));
    }
    const bccHeader = allBcc.length
        ? `Bcc: ${participant_mail_util_1.participantMailUtil.formatParticipants(allBcc)}`
        : null;
    return bccHeader;
}
/** Encodes the subject, just in case it has characters like emojis */
function composeSubjectHeader(subject) {
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
function composeHeaders(sender, recipients, subject, isMixedContent, bodyContentType, options) {
    const fromHeader = `From: ${participant_mail_util_1.participantMailUtil.formatParticipant(sender)}`;
    const toHeader = composeToHeader(recipients);
    const headers = [fromHeader, toHeader];
    if (options?.carbonCopy) {
        const ccHeader = `Cc: ${participant_mail_util_1.participantMailUtil.formatParticipants(options.carbonCopy)}`;
        headers.push(ccHeader);
    }
    const bccHeader = composeBccHeader(options?.blindCarbonCopy);
    if (bccHeader) {
        headers.push(bccHeader);
    }
    const subjectHeader = composeSubjectHeader(subject);
    headers.push(subjectHeader);
    const contentTypeHeaders = isMixedContent
        ? mail_constants_1.CONTENT_TYPE_HEADERS[mail_constants_1.CONTENT_TYPES.MULTIPART_MIXED]
        : mail_constants_1.CONTENT_TYPE_HEADERS[bodyContentType];
    contentTypeHeaders.forEach((header) => headers.push(header));
    return headers;
}
exports.headerMailUtil = {
    composeBccHeader,
    composeHeaders,
    composeSubjectHeader,
    composeToHeader,
};
