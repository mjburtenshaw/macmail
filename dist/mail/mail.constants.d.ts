export declare const BOUNDARY: {
    readonly START: "|||";
    readonly NEXT: "--|||";
    readonly END: "--|||--";
};
export declare const CONTENT_TYPES: {
    readonly MULTIPART_MIXED: "multipart/mixed";
    readonly TEXT_HTML: "text/html";
    readonly TEXT_PLAIN: "text/plain";
};
export type ContentTypeKey = keyof typeof CONTENT_TYPES;
export type ContentType = (typeof CONTENT_TYPES)[ContentTypeKey];
export declare const CONTENT_TYPE_HEADERS: {
    [key in ContentType]: string[];
};
