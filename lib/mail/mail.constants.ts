export const ENVS = {
  LOCAL: 'local',
  PRODUCTION: 'production',
  STAGING: 'staging',
} as const;

export const BOUNDARY = {
  START: '|||',
  NEXT: '--|||',
  END: '--|||--',
} as const;

export const CONTENT_TYPES = {
  MULTIPART_MIXED: 'multipart/mixed',
  TEXT_HTML: 'text/html',
  TEXT_PLAIN: 'text/plain',
} as const;

export type ContentTypeKey = keyof typeof CONTENT_TYPES;

export type ContentType = (typeof CONTENT_TYPES)[ContentTypeKey];

export const CONTENT_TYPE_HEADERS: {
  [key in ContentType]: string[];
} = {
  [CONTENT_TYPES.TEXT_HTML]: [
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
  ],
  [CONTENT_TYPES.MULTIPART_MIXED]: [
    `Content-Type: multipart/mixed; boundary="${BOUNDARY.START}"`,
    'MIME-Version: 1.0',
    '',
    BOUNDARY.NEXT,
  ],
  [CONTENT_TYPES.TEXT_PLAIN]: [
    'Content-Type: text/plain; charset="UTF-8"',
    'MIME-Version: 1.0',
    'Content-Transfer-Encoding: 7bit',
    '',
  ],
};
