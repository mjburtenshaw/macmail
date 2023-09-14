"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLetter = exports.requiredProps = exports.LETTER_NAME = void 0;
const components_1 = require("@react-email/components");
const react_1 = __importDefault(require("react"));
const bodyStyles = {
    backgroundColor: '#ffffff',
};
const containerStyles = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
};
const h1Styles = {
    color: '#333',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
};
exports.LETTER_NAME = 'TestLetter';
exports.requiredProps = [];
function TestLetter() {
    return (react_1.default.createElement(components_1.Html, null,
        react_1.default.createElement(components_1.Head, null),
        react_1.default.createElement(components_1.Preview, null, "This is a test letter"),
        react_1.default.createElement(components_1.Body, { style: bodyStyles },
            react_1.default.createElement(components_1.Container, { style: containerStyles },
                react_1.default.createElement(components_1.Heading, { style: h1Styles }, "Test")))));
}
exports.TestLetter = TestLetter;
