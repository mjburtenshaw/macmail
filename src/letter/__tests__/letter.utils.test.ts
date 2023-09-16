import { buildRenderOptions, validateProps } from '../letter.util';
import { LETTER_NAME } from './Test.letter';

describe('Letter utility tests: ', function testLetterUtilities() {
  describe('validateProps tests', function testValidateProps() {
    const DEFAULT_REQUIRED_PROPS = ['foo', 'bar'];
    const defaultLetterName = LETTER_NAME;
    const defaultProps = {
      foo: 'cat',
      bar: 'dog',
      baz: 'fish',
    };
    describe('When requiredProps is empty', () => {
      const requiredProps = [];
      it('should not throw', () => {
        expect(() => {
          validateProps(defaultProps, requiredProps, defaultLetterName);
        }).not.toThrow();
      });
    });
    describe('When requiredProps is not empty', () => {
      describe('and props is undefined', () => {
        const props = undefined;
        it('should throw a TypeError', () => {
          expect(() => {
            validateProps(props, DEFAULT_REQUIRED_PROPS, defaultLetterName);
          }).toThrowError(TypeError);
        });
      });
      describe("and props doesn't have all requiredProps", () => {
        const invalidProps = { ...defaultProps };
        const sampleRequiredProp = DEFAULT_REQUIRED_PROPS[0];
        delete invalidProps[sampleRequiredProp]; // Now it's invalid
        it('should throw an Error', () => {
          expect(() => {
            validateProps(
              invalidProps,
              DEFAULT_REQUIRED_PROPS,
              defaultLetterName
            );
          }).toThrowError(Error);
        });
      });
      describe('and props has all requiredProps', () => {
        it('should not throw', () => {
          expect(() => {
            validateProps(
              defaultProps,
              DEFAULT_REQUIRED_PROPS,
              defaultLetterName
            );
          }).not.toThrow();
        });
      });
    });
  });
  describe('buildRenderOptions tests', function testBuildRenderOptions() {
    describe('When options includes plainText', () => {
      it('should return an object with a plainText key', () => {
        const options = { plainText: true };
        const renderOptions = buildRenderOptions(options);
        expect(Object.keys(renderOptions).includes('plainText')).toBe(true);
      });
    });
    describe('When options includes pretty', () => {
      it('should return an object with a plainText key', () => {
        const options = { pretty: true };
        const renderOptions = buildRenderOptions(options);
        expect(Object.keys(renderOptions).includes('pretty')).toBe(true);
      });
    });
    describe('When options does NOT include plainText or pretty', () => {
      it('should return an empty object', () => {
        const options = { someOtherKey: true };
        const renderOptions = buildRenderOptions(options);
        expect(Object.keys(renderOptions).length).toBe(0);
      });
    });
    describe('When options is undefined', () => {
      it('should return an empty object', () => {
        const options = undefined;
        const renderOptions = buildRenderOptions(options);
        expect(Object.keys(renderOptions).length).toBe(0);
      });
    });
  });
});
