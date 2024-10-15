"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const letter_1 = require("./letter");
const mail_1 = require("./mail");
const useConfig_1 = require("./useConfig");
const validateEnv_1 = require("./validateEnv");
async function init() {
    await (0, useConfig_1.useConfig)();
    (0, validateEnv_1.validateEnv)();
    const { indexLetters, ...letterPublicExports } = letter_1.letter;
    await indexLetters();
    return {
        letter: letterPublicExports,
        mail: mail_1.mail,
    };
}
// CommonJS export syntax allows EcmaScript default imports to work after it's compiled.
module.exports = init;
