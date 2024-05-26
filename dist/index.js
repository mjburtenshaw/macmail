"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macmail = void 0;
const letter_1 = require("./letter");
const mail_1 = require("./mail");
const useConfig_1 = require("./useConfig");
const validateEnv_1 = require("./validateEnv");
async function main() {
    await (0, useConfig_1.useConfig)();
    (0, validateEnv_1.validateEnv)();
}
main();
exports.macmail = {
    letter: letter_1.letter,
    mail: mail_1.mail,
};
// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = exports.macmail;
