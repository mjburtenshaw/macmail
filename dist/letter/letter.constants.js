"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexLetters = exports.LETTERS = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function findLetterFiles(directory) {
    const letterFiles = [];
    try {
        const files = await fs_1.default.promises.readdir(directory);
        for (const file of files) {
            const filePath = path_1.default.join(directory, file);
            const stats = await fs_1.default.promises.stat(filePath);
            if (stats.isDirectory()) {
                const nestedFiles = await findLetterFiles(filePath);
                letterFiles.push(...nestedFiles);
            }
            else if (file.includes('.letter.')) {
                letterFiles.push(filePath);
            }
        }
    }
    catch (error) {
        console.error('💀 Error reading directory:', error);
    }
    return letterFiles;
}
async function importLetterModules(letterFiles) {
    const letterModules = await Promise.all(letterFiles.map(async (file) => {
        const module = await import(file);
        return module;
    }));
    return letterModules;
}
async function indexLetters() {
    const srcDir = path_1.default.resolve(process.cwd(), process.env.MACMAIL_SOURCE_DIR);
    const letterFiles = await findLetterFiles(srcDir);
    const letterModules = await importLetterModules(letterFiles);
    const letters = letterModules.reduce((acc, letterModule) => {
        const letter = {
            Component: letterModule[letterModule.LETTER_NAME],
            requiredProps: letterModule.requiredProps,
        };
        acc[letterModule.LETTER_NAME] = letter;
        return acc;
    }, {});
    exports.LETTERS = letters;
}
exports.indexLetters = indexLetters;
