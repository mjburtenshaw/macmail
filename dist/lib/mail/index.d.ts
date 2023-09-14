import { composeMessage } from './message.mail.util';
export type * from './mail.types';
export declare const mailUtil: {
    buildAttachment: (file: import("./mail.types").BuildAttachmentFile) => Promise<import("./mail.types").AttachmentFile>;
    composeMessage: typeof composeMessage;
    isMailAddress: (candidate: any) => candidate is `${string}@${string}.${string}`;
    ENVS: {
        readonly LOCAL: "local";
        readonly PRODUCTION: "production";
        readonly STAGING: "staging";
    };
    BOUNDARY: {
        readonly START: "|||";
        readonly NEXT: "--|||";
        readonly END: "--|||--";
    };
    CONTENT_TYPES: {
        readonly MULTIPART_MIXED: "multipart/mixed";
        readonly TEXT_HTML: "text/html";
        readonly TEXT_PLAIN: "text/plain";
    };
    CONTENT_TYPE_HEADERS: {
        "text/html": string[];
        "multipart/mixed": string[];
        "text/plain": string[];
    };
};
