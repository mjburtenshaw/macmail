"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macmail = void 0;
const letter_1 = require("./letter");
const mail_1 = require("./mail");
const useConfig_1 = require("./useConfig");
async function init() {
    await (0, useConfig_1.useConfig)();
    await letter_1.letter.indexLetters();
}
exports.macmail = {
    init,
    letter: letter_1.letter,
    mail: mail_1.mail,
};
exports.default = exports.macmail;
