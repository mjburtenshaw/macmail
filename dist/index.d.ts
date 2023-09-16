export declare const macmail: {
    letter: {
        LETTERS: import("./letter").Letters;
        render: typeof import("./letter/letter.util").render;
    };
    mail: {
        buildAttachment: (file: import("./mail").BuildAttachmentFile) => Promise<import("./mail").AttachmentFile>;
        composeMessage: typeof import("./mail/message.mail.util").composeMessage;
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
};
export type * from './letter';
export type * from './mail';
export default macmail;
