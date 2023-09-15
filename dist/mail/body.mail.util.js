"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMailUtil = void 0;
const mail_constants_1 = require("./mail.constants");
const letter_1 = require("../letter");
function composeBody(isMixedContent, bodyContentType, requestedLetter) {
    const bodyLines = [];
    if (isMixedContent) {
        const bodyHeaders = mail_constants_1.CONTENT_TYPE_HEADERS[bodyContentType];
        bodyHeaders.forEach((bodyHeader) => bodyLines.push(bodyHeader));
    }
    const renderLetterOptions = {
        plainText: bodyContentType !== mail_constants_1.CONTENT_TYPES.TEXT_HTML,
    };
    const body = letter_1.letter.render(requestedLetter, renderLetterOptions);
    bodyLines.push(body);
    if (isMixedContent) {
        bodyLines.push('');
        bodyLines.push(mail_constants_1.BOUNDARY.NEXT);
    }
    return bodyLines;
}
exports.bodyMailUtil = { composeBody };
