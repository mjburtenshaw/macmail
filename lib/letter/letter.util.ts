import { LETTERS } from './letter.constants';
import type {
  LetterProps,
  RenderLetterOptions,
  RequestedLetter,
} from './letter.types';
import * as reactEmail from '@react-email/render';

export function validateProps(
  props: LetterProps | undefined,
  requiredProps: string[],
  letterName: string
) {
  if (requiredProps.length) {
    const helpMessage = `${letterName} requires the following props: ${requiredProps.join(
      ', '
    )}`;
    if (!props) {
      throw new TypeError(`letterProps is undefined. ${helpMessage}`);
    }
    const isMissingRequiredProps = requiredProps.some(
      (requiredProp) => props[requiredProp] === undefined
    );
    if (isMissingRequiredProps) {
      throw new Error(`letterProps is missing required values. ${helpMessage}`);
    }
  }
}

/** Extracts reactEmail.Options from RenderLetterOptions */
export function buildRenderOptions(options: RenderLetterOptions | undefined) {
  const renderOptions: reactEmail.Options = {};
  if (options?.plainText !== undefined) {
    renderOptions.plainText = options.plainText;
  }
  if (options?.pretty !== undefined) {
    renderOptions.pretty = options.pretty;
  }
  return renderOptions;
}

export function renderLetter(
  requestedLetter: RequestedLetter,
  options?: RenderLetterOptions
) {
  const { Component, requiredProps } = LETTERS[requestedLetter.name];
  validateProps(requestedLetter.props, requiredProps, requestedLetter.name);
  const renderOptions = buildRenderOptions(options);
  const Letter = Component(requestedLetter.props);
  const letter = reactEmail.render(Letter, renderOptions);
  return letter;
}
