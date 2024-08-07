export type * from './mail.types';
export declare const mail: {
    buildAttachment: (file: import("./mail.types").BuildAttachmentFile) => Promise<import("./mail.types").AttachmentFile>;
    composeMessage: (sender: import("./mail.types").SmtpParticipant, recipients: import("./mail.types").SmtpParticipant | import("./mail.types").SmtpParticipant[], subject: string, requestedLetter: import("..").RequestedLetter, options?: import("./mail.types").ComposeMessageOptions) => string;
    isMailAddress: (candidate: any) => candidate is `${string}@${string}.${string}`;
    isSmtpParticipant: (candidate: any) => candidate is import("./mail.types").SmtpParticipant;
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
