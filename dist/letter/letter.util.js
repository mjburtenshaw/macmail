"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.buildRenderOptions = exports.validateProps = void 0;
const letter_constants_1 = require("./letter.constants");
const reactEmail = __importStar(require("@react-email/render"));
function validateProps(props, requiredProps, letterName) {
    if (requiredProps.length) {
        const helpMessage = `${letterName} requires the following props: ${requiredProps.join(', ')}`;
        if (!props) {
            throw new TypeError(`letterProps is undefined. ${helpMessage}`);
        }
        const isMissingRequiredProps = requiredProps.some((requiredProp) => props[requiredProp] === undefined);
        if (isMissingRequiredProps) {
            throw new Error(`letterProps is missing required values. ${helpMessage}`);
        }
    }
}
exports.validateProps = validateProps;
/** Extracts reactEmail.Options from RenderLetterOptions */
function buildRenderOptions(options) {
    const renderOptions = {};
    if (options?.plainText !== undefined) {
        renderOptions.plainText = options.plainText;
    }
    if (options?.pretty !== undefined) {
        renderOptions.pretty = options.pretty;
    }
    return renderOptions;
}
exports.buildRenderOptions = buildRenderOptions;
function render(requestedLetter, options) {
    const { Component, requiredProps } = letter_constants_1.LETTERS[requestedLetter.name];
    validateProps(requestedLetter.props, requiredProps, requestedLetter.name);
    const renderOptions = buildRenderOptions(options);
    const Letter = Component(requestedLetter.props);
    const letter = reactEmail.render(Letter, renderOptions);
    return letter;
}
exports.render = render;
