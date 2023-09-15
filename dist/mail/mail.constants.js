"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_TYPE_HEADERS = exports.CONTENT_TYPES = exports.BOUNDARY = exports.ENVS = void 0;
exports.ENVS = {
    LOCAL: 'local',
    PRODUCTION: 'production',
    STAGING: 'staging',
};
exports.BOUNDARY = {
    START: '|||',
    NEXT: '--|||',
    END: '--|||--',
};
exports.CONTENT_TYPES = {
    MULTIPART_MIXED: 'multipart/mixed',
    TEXT_HTML: 'text/html',
    TEXT_PLAIN: 'text/plain',
};
exports.CONTENT_TYPE_HEADERS = {
    [exports.CONTENT_TYPES.TEXT_HTML]: [
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        '',
    ],
    [exports.CONTENT_TYPES.MULTIPART_MIXED]: [
        `Content-Type: multipart/mixed; boundary="${exports.BOUNDARY.START}"`,
        'MIME-Version: 1.0',
        '',
        exports.BOUNDARY.NEXT,
    ],
    [exports.CONTENT_TYPES.TEXT_PLAIN]: [
        'Content-Type: text/plain; charset="UTF-8"',
        'MIME-Version: 1.0',
        'Content-Transfer-Encoding: 7bit',
        '',
    ],
};
