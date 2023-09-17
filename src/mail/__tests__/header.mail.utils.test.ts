import {
  BOUNDARY,
  CONTENT_TYPES,
  CONTENT_TYPE_HEADERS,
  ENVS,
} from '../mail.constants';
import { ComposeHeadersOptions, SmtpParticipant } from '../mail.types';

describe('Header utility tests', function testHeaderUtilities() {
  const TEST_PARTICIPANT = 'test@example.com';
  const HARRY = 'harry@hsww.edu';
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });
  describe('composeToHeader tests', function testComposeToHeader() {
    describe('When ENV is production', () => {
      it('should format the provided participants', async () => {
        process.env.ENV = ENVS.PRODUCTION;
        const EXPECTED_TO_HEADER = `To: ${TEST_PARTICIPANT}`;
        const module = await import('../header.mail.util');
        const toHeader =
          module.headerMailUtil.composeToHeader(TEST_PARTICIPANT);
        expect(toHeader).toBe(EXPECTED_TO_HEADER);
      });
    });
    describe('When ENV is not production', () => {
      describe('and MACMAIL_MY_EMAIL_ADDRESS is falsey', () => {
        it('should overwrite the recipients with the configured production dev recipient', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS = '';
          const EXPECTED_TO_HEADER = `To: ${process.env.MACMAIL_PRODUCTION_DEV_RECIPIENT}`;
          const module = await import('../header.mail.util');
          const toHeader =
            module.headerMailUtil.composeToHeader(TEST_PARTICIPANT);
          expect(toHeader).toBe(EXPECTED_TO_HEADER);
        });
      });
      describe('and MACMAIL_MY_EMAIL_ADDRESS is defined', () => {
        it('should overwrite the recipients with MACMAIL_MY_EMAIL_ADDRESS', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS = HARRY;
          const EXPECTED_TO_HEADER = `To: ${process.env.MACMAIL_MY_EMAIL_ADDRESS}`;
          const module = await import('../header.mail.util');
          const toHeader =
            module.headerMailUtil.composeToHeader(TEST_PARTICIPANT);
          expect(toHeader).toBe(EXPECTED_TO_HEADER);
        });
      });
      describe('and MACMAIL_MY_EMAIL_ADDRESS and MACMAIL_MY_NAME is defined', () => {
        it('should overwrite the recipients with MACMAIL_MY_EMAIL_ADDRESS and MACMAIL_MY_NAME', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS = HARRY;
          process.env.MACMAIL_MY_NAME = 'Harry Potter';
          const EXPECTED_TO_HEADER = `To: ${process.env.MACMAIL_MY_NAME} <${process.env.MACMAIL_MY_EMAIL_ADDRESS}>`;
          const module = await import('../header.mail.util');
          const toHeader =
            module.headerMailUtil.composeToHeader(TEST_PARTICIPANT);
          expect(toHeader).toBe(EXPECTED_TO_HEADER);
        });
      });
    });
  });
  describe('composeBccHeader tests', function testComposeBccHeaders() {
    describe('When ENV is production', () => {
      describe('and blindCarbonCopy is an array', () => {
        describe('and the array is empty', () => {
          it('should add the configured production dev recipient to the Bcc header', async () => {
            process.env.ENV = ENVS.PRODUCTION;
            const blindCarbonCopy = [];
            const EXPECTED_BCC_HEADER = `Bcc: ${process.env.MACMAIL_PRODUCTION_DEV_RECIPIENT}`;
            const module = await import('../header.mail.util');
            const bccHeader =
              module.headerMailUtil.composeBccHeader(blindCarbonCopy);
            expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
          });
        });
        describe('and the array is NOT empty', () => {
          it('should add all elements to the header and the configured production dev recipient', async () => {
            process.env.ENV = ENVS.PRODUCTION;
            const blindCarbonCopy: SmtpParticipant[] = [
              TEST_PARTICIPANT,
              TEST_PARTICIPANT,
            ];
            const EXPECTED_BCC_HEADER = `Bcc: ${TEST_PARTICIPANT}, ${TEST_PARTICIPANT}, ${process.env.MACMAIL_PRODUCTION_DEV_RECIPIENT}`;
            const module = await import('../header.mail.util');
            const bccHeader =
              module.headerMailUtil.composeBccHeader(blindCarbonCopy);
            expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
          });
        });
      });
      describe('and blindCarbonCopy is an address', () => {
        it('should add the address to the header and the configured production dev recipient', async () => {
          process.env.ENV = ENVS.PRODUCTION;
          const blindCarbonCopy = TEST_PARTICIPANT;
          const EXPECTED_BCC_HEADER = `Bcc: ${TEST_PARTICIPANT}, ${process.env.MACMAIL_PRODUCTION_DEV_RECIPIENT}`;
          const module = await import('../header.mail.util');
          const bccHeader =
            module.headerMailUtil.composeBccHeader(blindCarbonCopy);
          expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
        });
      });
      describe('and blindCarbonCopy is undefined', () => {
        it('should add the configured production dev recipient to the Bcc header', async () => {
          process.env.ENV = ENVS.PRODUCTION;
          const blindCarbonCopy = undefined;
          const EXPECTED_BCC_HEADER = `Bcc: ${process.env.MACMAIL_PRODUCTION_DEV_RECIPIENT}`;
          const module = await import('../header.mail.util');
          const bccHeader =
            module.headerMailUtil.composeBccHeader(blindCarbonCopy);
          expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
        });
      });
    });
    describe('When ENV is NOT production', () => {
      describe('and blindCarbonCopy is an array', () => {
        describe('and the array is empty', () => {
          it('should return null', async () => {
            process.env.ENV = ENVS.LOCAL;
            const blindCarbonCopy = undefined;
            const module = await import('../header.mail.util');
            const bccHeader =
              module.headerMailUtil.composeBccHeader(blindCarbonCopy);
            expect(bccHeader).toBe(null);
          });
        });
        describe('and the array is NOT empty', () => {
          it('should add all elements to the header', async () => {
            process.env.ENV = ENVS.LOCAL;
            const blindCarbonCopy: SmtpParticipant[] = [
              TEST_PARTICIPANT,
              TEST_PARTICIPANT,
            ];
            const EXPECTED_BCC_HEADER = `Bcc: ${TEST_PARTICIPANT}, ${TEST_PARTICIPANT}`;
            const module = await import('../header.mail.util');
            const bccHeader =
              module.headerMailUtil.composeBccHeader(blindCarbonCopy);
            expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
          });
        });
      });
      describe('and blindCarbonCopy is an address', () => {
        it('should add the address to the header', async () => {
          process.env.ENV = ENVS.LOCAL;
          const blindCarbonCopy = TEST_PARTICIPANT;
          const EXPECTED_BCC_HEADER = `Bcc: ${TEST_PARTICIPANT}`;
          const module = await import('../header.mail.util');
          const bccHeader =
            module.headerMailUtil.composeBccHeader(blindCarbonCopy);
          expect(bccHeader).toBe(EXPECTED_BCC_HEADER);
        });
      });
      describe('and blindCarbonCopy is undefined', () => {
        it('should return null', async () => {
          process.env.ENV = ENVS.LOCAL;
          const blindCarbonCopy = undefined;
          const module = await import('../header.mail.util');
          const bccHeader =
            module.headerMailUtil.composeBccHeader(blindCarbonCopy);
          expect(bccHeader).toBe(null);
        });
      });
    });
  });
  describe('composeHeaders tests', function testComposeHeaders() {
    const BODY_CONTENT_TYPE = CONTENT_TYPES.TEXT_HTML;
    const IS_MIXED_CONTENT = true;
    const OPTIONS: ComposeHeadersOptions = {
      carbonCopy: 'hermoine@hsww.edu',
      blindCarbonCopy: 'ron@hsww.edu',
    };
    const recipients = HARRY;
    const sender = TEST_PARTICIPANT;
    const SUBJECT = 'Test Email 🤖';
    describe('When options is undefined', () => {
      it('should NOT include a cc header', async () => {
        const module = await import('../header.mail.util');
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          IS_MIXED_CONTENT,
          BODY_CONTENT_TYPE
        );
        const isCcHeaderPresent = headers.some((header) =>
          header.toLowerCase().startsWith('cc: ')
        );
        expect(isCcHeaderPresent).toBe(false);
      });
      describe('and ENV is production', () => {
        it('should include a bcc header', async () => {
          process.env.ENV = ENVS.PRODUCTION;
          const module = await import('../header.mail.util');
          const headers = module.headerMailUtil.composeHeaders(
            sender,
            recipients,
            SUBJECT,
            IS_MIXED_CONTENT,
            BODY_CONTENT_TYPE
          );
          const isBccHeaderPresent = headers.some((header) =>
            header.toLowerCase().startsWith('bcc: ')
          );
          expect(isBccHeaderPresent).toBe(true);
        });
      });
      describe('and ENV is NOT production', () => {
        it('should NOT include a bcc header', async () => {
          process.env.ENV = ENVS.LOCAL;
          const module = await import('../header.mail.util');
          const headers = module.headerMailUtil.composeHeaders(
            sender,
            recipients,
            SUBJECT,
            IS_MIXED_CONTENT,
            BODY_CONTENT_TYPE
          );
          const isBccHeaderPresent = headers.some((header) =>
            header.toLowerCase().startsWith('bcc: ')
          );
          expect(isBccHeaderPresent).toBe(false);
        });
      });
    });
    describe('When options includes carbonCopy', () => {
      it('should include a cc header', async () => {
        const module = await import('../header.mail.util');
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          IS_MIXED_CONTENT,
          BODY_CONTENT_TYPE,
          OPTIONS
        );
        const isCcHeaderPresent = headers.some((header) =>
          header.toLowerCase().startsWith('cc: ')
        );
        expect(isCcHeaderPresent).toBe(true);
      });
    });
    describe('When options does NOT include carbonCopy', () => {
      it('should NOT include a cc header', async () => {
        const module = await import('../header.mail.util');
        const options = { ...OPTIONS };
        delete options.carbonCopy;
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          IS_MIXED_CONTENT,
          BODY_CONTENT_TYPE,
          options
        );
        const isCcHeaderPresent = headers.some((header) =>
          header.toLowerCase().startsWith('cc: ')
        );
        expect(isCcHeaderPresent).toBe(false);
      });
    });
    describe('When options includes blindCarbonCopy', () => {
      it('should include a bcc header', async () => {
        const module = await import('../header.mail.util');
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          IS_MIXED_CONTENT,
          BODY_CONTENT_TYPE,
          OPTIONS
        );
        const isBccHeaderPresent = headers.some((header) =>
          header.toLowerCase().startsWith('bcc: ')
        );
        expect(isBccHeaderPresent).toBe(true);
      });
    });
    describe('When options does NOT include blindCarbonCopy', () => {
      describe('and ENV is production', () => {
        it('should include a bcc header', async () => {
          process.env.ENV = ENVS.PRODUCTION;
          const module = await import('../header.mail.util');
          const options = { ...OPTIONS };
          delete options.blindCarbonCopy;
          const headers = module.headerMailUtil.composeHeaders(
            sender,
            recipients,
            SUBJECT,
            IS_MIXED_CONTENT,
            BODY_CONTENT_TYPE,
            options
          );
          const isBccHeaderPresent = headers.some((header) =>
            header.toLowerCase().startsWith('bcc: ')
          );
          expect(isBccHeaderPresent).toBe(true);
        });
      });
      describe('and ENV is NOT production', () => {
        it('should NOT include a bcc header', async () => {
          process.env.ENV = ENVS.LOCAL;
          const module = await import('../header.mail.util');
          const options = { ...OPTIONS };
          delete options.blindCarbonCopy;
          const headers = module.headerMailUtil.composeHeaders(
            sender,
            recipients,
            SUBJECT,
            IS_MIXED_CONTENT,
            BODY_CONTENT_TYPE,
            options
          );
          const isBccHeaderPresent = headers.some((header) =>
            header.toLowerCase().startsWith('bcc: ')
          );
          expect(isBccHeaderPresent).toBe(false);
        });
      });
    });
    describe('When isMixedContent is true', () => {
      it('should use the MULTIPART_MIXED headers', async () => {
        const module = await import('../header.mail.util');
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          IS_MIXED_CONTENT,
          BODY_CONTENT_TYPE,
          OPTIONS
        );
        const multipartMixedHeaders =
          CONTENT_TYPE_HEADERS[CONTENT_TYPES.MULTIPART_MIXED];
        const areMmHeadersPresent = multipartMixedHeaders.every((mmHeader) =>
          headers.includes(mmHeader)
        );
        expect(areMmHeadersPresent).toBe(true);
      });
    });
    describe('When isMixedContent is false', () => {
      it('should not have boundary headers', async () => {
        const module = await import('../header.mail.util');
        const isMixedContent = false;
        const headers = module.headerMailUtil.composeHeaders(
          sender,
          recipients,
          SUBJECT,
          isMixedContent,
          BODY_CONTENT_TYPE,
          OPTIONS
        );
        const hasNoBoundaryHeaders = headers.every(
          (header) =>
            !header.includes(BOUNDARY.START) && header !== BOUNDARY.NEXT
        );
        expect(hasNoBoundaryHeaders).toBe(true);
      });
    });
  });
});
