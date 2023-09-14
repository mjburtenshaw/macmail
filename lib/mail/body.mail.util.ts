import {
  BOUNDARY,
  CONTENT_TYPES,
  CONTENT_TYPE_HEADERS,
} from './mail.constants';
import {
  letterUtil,
  type RenderLetterOptions,
  type RequestedLetter,
} from '../letter';
import type { BodyContentType } from './mail.types';

function composeBody(
  isMixedContent: boolean,
  bodyContentType: BodyContentType,
  requestedLetter: RequestedLetter
) {
  const bodyLines: string[] = [];
  if (isMixedContent) {
    const bodyHeaders = CONTENT_TYPE_HEADERS[bodyContentType];
    bodyHeaders.forEach((bodyHeader) => bodyLines.push(bodyHeader));
  }
  const renderLetterOptions: RenderLetterOptions = {
    plainText: bodyContentType !== CONTENT_TYPES.TEXT_HTML,
  };
  const body = letterUtil.renderLetter(requestedLetter, renderLetterOptions);
  bodyLines.push(body);
  if (isMixedContent) {
    bodyLines.push('');
    bodyLines.push(BOUNDARY.NEXT);
  }
  return bodyLines;
}

export const bodyMailUtil = { composeBody };
