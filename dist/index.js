"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useConfig_1 = require("./useConfig");
let letter;
let mail;
async function initialize() {
    await (0, useConfig_1.useConfig)();
    const letterModule = require('./letter');
    const mailModule = require('./mail');
    letter = letterModule.letter;
    mail = mailModule.mail;
}
initialize().then(() => {
    module.exports = {
        letter,
        mail,
    };
});
