"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfig = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
async function readConfig() {
    const configFilePath = path_1.default.resolve(process.cwd(), 'macmail.config.yml');
    try {
        const rawConfig = await fs_1.promises.readFile(configFilePath, 'utf8');
        const config = js_yaml_1.default.load(rawConfig);
        return config;
    }
    catch (err) {
        throw new Error(`macmail: 💀 Error reading configuration: ${err.message}`);
    }
}
function applyConfig(config) {
    try {
        for (const key in config) {
            if (Object.hasOwnProperty.call(config, key)) {
                const macmailKey = `MACMAIL_${key.toUpperCase()}`;
                const configValue = config[key];
                process.env[macmailKey] = configValue;
            }
        }
    }
    catch (err) {
        throw new Error(`macmail: 💀 Error applying configuration: ${err.message}`);
    }
}
async function useConfig() {
    if (process.env.NODE_ENV !== 'test') {
        const config = await readConfig();
        applyConfig(config);
    }
}
exports.useConfig = useConfig;
