"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
async function readConfig() {
    try {
        const configFilePath = path_1.default.resolve(process.cwd(), 'macmail.config.yml');
        const rawConfig = await fs_1.default.promises.readFile(configFilePath, 'utf8');
        const config = js_yaml_1.default.load(rawConfig);
        return config;
    }
    catch (err) {
        throw new Error(`macmail: 💀  Error reading configuration: ${err.message}`);
    }
}
function applyConfig(config) {
    try {
        const foundKeys = [];
        for (const key in config) {
            if (Object.hasOwnProperty.call(config, key)) {
                const macmailKey = `MACMAIL_${key.toUpperCase()}`;
                const configValue = config[key];
                process.env[macmailKey] = configValue;
                foundKeys.push(macmailKey);
            }
        }
        const requiredKeys = [
            'MACMAIL_OVERRIDE_RECIPIENTS',
            'MACMAIL_PRODUCTION_DEV_RECIPIENT',
            'MACMAIL_SOURCE_DIR',
        ];
        requiredKeys.forEach((requiredKey) => {
            if (!foundKeys.includes(requiredKey)) {
                throw new Error(`Missing required config ${requiredKey}: Please add this to your macmail.config.yml file.`);
            }
        });
    }
    catch (err) {
        throw new Error(`macmail: 💀  Error applying configuration: ${err.message}`);
    }
}
async function useConfig() {
    if (process.env.NODE_ENV !== 'test') {
        const config = await readConfig();
        applyConfig(config);
    }
}
exports.useConfig = useConfig;
