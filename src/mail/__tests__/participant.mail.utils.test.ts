import { ENVS } from '../mail.constants';
import { MailAddress, UsernameAddressCombo } from '../mail.types';
import { participantMailUtil } from '../participant.mail.util';

const ADDRESSES: {
  [key: string]: MailAddress;
} = {
  TEST: 'test@example.com',
  FOO: 'foo@example.com',
  BAR: 'bar@example.com',
  DEV: 'dev@example.com',
};

const USERNAME_ADDRESSES: {
  [key: string]: UsernameAddressCombo;
} = {
  HARRY: {
    address: 'harry@hsww.edu',
    username: 'Harry Potter',
  },
  HERMOINE: {
    address: 'hermoine@hsww.edu',
    username: 'Hermoine Granger',
  },
  RON: {
    address: 'ron@hsww.edu',
    username: 'Ron Weasley',
  },
};

describe('Paricipant utility tests', function testParticipantUtilities() {
  describe('isMailAddress tests', function testIsMailAddress() {
    describe('When candidate is not a string', () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress(10);
        expect(result).toBe(false);
      });
    });
    describe('When candidate is falsey', () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('');
        expect(result).toBe(false);
      });
    });
    describe('When there is no domain', () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test');
        expect(result).toBe(false);
      });
    });
    describe("When a username can't be indentified", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test@test@test.com');
        expect(result).toBe(false);
      });
    });
    describe("When a username can't be located", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('@test.com');
        expect(result).toBe(false);
      });
    });
    describe("When a domain can't be located", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test@');
        expect(result).toBe(false);
      });
    });
    describe("When a TLD can't be indentified", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test@test.com.org');
        expect(result).toBe(false);
      });
    });
    describe("When a subdomain can't be located", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test@.com');
        expect(result).toBe(false);
      });
    });
    describe("When a TLD can't be located", () => {
      it('should return false', () => {
        const result = participantMailUtil.isMailAddress('test@test');
        expect(result).toBe(false);
      });
    });
    describe('When a candiate is valid', () => {
      it('should return true', () => {
        const result = participantMailUtil.isMailAddress('test@example.com');
        expect(result).toBe(true);
      });
    });
  });
  describe('isSmtpParticipant tests', function testIsSmtpParticipant() {
    describe('When candidate is a mail address', () => {
      it('should return true', () => {
        const result =
          participantMailUtil.isSmtpParticipant('test@example.com');
        expect(result).toBe(true);
      });
    });
    describe('When candidate is an object', () => {
      describe('and there are less than 2 keys', () => {
        it('should return false', () => {
          const result = participantMailUtil.isSmtpParticipant({ foo: 'bar' });
          expect(result).toBe(false);
        });
      });
      describe('and there are more than 2 keys', () => {
        it('should return false', () => {
          const result = participantMailUtil.isSmtpParticipant({
            foo: 'bar',
            baz: 'bat',
            fizz: 'buzz',
          });
          expect(result).toBe(false);
        });
      });
      describe('and there are missing required keys', () => {
        it('should return false', () => {
          const result = participantMailUtil.isSmtpParticipant({
            foo: 'bar',
            username: 'baz',
          });
          expect(result).toBe(false);
        });
      });
      describe('and username is not a string', () => {
        it('should return false', () => {
          const result = participantMailUtil.isSmtpParticipant({
            address: 'test@example.com',
            username: 10,
          });
          expect(result).toBe(false);
        });
      });
      describe('and the candidate is valid', () => {
        it('should return true', () => {
          const result = participantMailUtil.isSmtpParticipant({
            address: 'test@example.com',
            username: 'Test User',
          });
          expect(result).toBe(true);
        });
      });
    });
    describe('When candidate is not a string or object', () => {
      it('should return false', () => {
        const result = participantMailUtil.isSmtpParticipant(10);
        expect(result).toBe(false);
      });
    });
  });
  describe('formatParticipant tests', function testFormatParticipant() {
    describe('When input is an address', () => {
      const sampleParticipant = ADDRESSES.TEST;
      it('should return the input', () => {
        const formattedParticipant =
          participantMailUtil.formatParticipant(sampleParticipant);
        expect(formattedParticipant).toBe(sampleParticipant);
      });
    });
    describe('When input is a username-address combos', () => {
      const sampleParticipant = USERNAME_ADDRESSES.HARRY;
      it('should return a username <address> string', () => {
        const expectedResult = `${sampleParticipant.username} <${sampleParticipant.address}>`;
        const formattedParticipant =
          participantMailUtil.formatParticipant(sampleParticipant);
        expect(formattedParticipant).toBe(expectedResult);
      });
    });
  });
  describe('formatParticipants tests', function testFormatParticipants() {
    describe('When input is an array', () => {
      describe('and all elements are username-address combos', () => {
        const participants = [
          USERNAME_ADDRESSES.HARRY,
          USERNAME_ADDRESSES.HERMOINE,
          USERNAME_ADDRESSES.RON,
        ];
        it('should return a string having username <address> combos delimited by commas', () => {
          const expectedResult = participants
            .map(
              (particpant) => `${particpant.username} <${particpant.address}>`
            )
            .join(', ');
          const formattedParticipants =
            participantMailUtil.formatParticipants(participants);
          expect(formattedParticipants).toBe(expectedResult);
        });
      });
      describe('and all elements are addresses', () => {
        const participants = [ADDRESSES.TEST, ADDRESSES.FOO, ADDRESSES.BAR];
        it('should return the addresses joined by commas', () => {
          const expectedResult = participants.join(', ');
          const formattedParticipants =
            participantMailUtil.formatParticipants(participants);
          expect(formattedParticipants).toBe(expectedResult);
        });
      });
      describe('and the elements are a mix of addresses and username-address combos', () => {
        const participants = [
          ADDRESSES.TEST,
          USERNAME_ADDRESSES.HARRY,
          ADDRESSES.FOO,
        ];
        it('should return a string containing the addresses and username <address> combos delimited by commas', () => {
          const expectedResult = `${ADDRESSES.TEST}, ${USERNAME_ADDRESSES.HARRY.username} <${USERNAME_ADDRESSES.HARRY.address}>, ${ADDRESSES.FOO}`;
          const formattedParticipants =
            participantMailUtil.formatParticipants(participants);
          expect(formattedParticipants).toBe(expectedResult);
        });
      });
    });
    describe('When input is an address', () => {
      it('should return the input', () => {
        const sampleParticipant = ADDRESSES.TEST;
        const formattedParticipant =
          participantMailUtil.formatParticipants(sampleParticipant);
        expect(formattedParticipant).toBe(sampleParticipant);
      });
    });
  });
  describe('getDevRecipient tests', function testGetDevRecipient() {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });
    afterAll(() => {
      process.env = OLD_ENV;
    });
    describe('When ENV is production', () => {
      it('should return the configured production dev recipient', async () => {
        process.env.ENV = ENVS.PRODUCTION;
        const module = await import('../participant.mail.util');
        const devRecipient = module.participantMailUtil.getDevRecipient();
        expect(devRecipient).toBe(ADDRESSES.DEV);
      });
    });
    describe('When ENV is NOT production', () => {
      describe('and MACMAIL_MY_EMAIL_ADDRESS and MACMAIL_MY_NAME are falsey', () => {
        it('should return the configured production dev recipient', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS = '';
          process.env.MACMAIL_MY_NAME = '';
          const module = await import('../participant.mail.util');
          const devRecipient = module.participantMailUtil.getDevRecipient();
          expect(devRecipient).toBe(ADDRESSES.DEV);
        });
      });
      describe('and MACMAIL_MY_EMAIL_ADDRESS is truthy and MACMAIL_MY_NAME is falsey', () => {
        it('should return MACMAIL_MY_EMAIL_ADDRESS', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS = ADDRESSES.TEST;
          process.env.MACMAIL_MY_NAME = '';
          const module = await import('../participant.mail.util');
          const devRecipient = module.participantMailUtil.getDevRecipient();
          expect(devRecipient).toBe(process.env.MACMAIL_MY_EMAIL_ADDRESS);
        });
      });
      describe('and MACMAIL_MY_EMAIL_ADDRESS and MACMAIL_MY_NAME are truthy', () => {
        it('should return an username-address combo', async () => {
          process.env.ENV = ENVS.LOCAL;
          process.env.MACMAIL_MY_EMAIL_ADDRESS =
            USERNAME_ADDRESSES.HARRY.address;
          process.env.MACMAIL_MY_NAME = USERNAME_ADDRESSES.HARRY.username;
          const module = await import('../participant.mail.util');
          const devRecipient =
            module.participantMailUtil.getDevRecipient() as UsernameAddressCombo;
          expect(devRecipient).toMatchObject<UsernameAddressCombo>;
          expect(devRecipient.address).toBe(
            process.env.MACMAIL_MY_EMAIL_ADDRESS
          );
          expect(devRecipient.username).toBe(process.env.MACMAIL_MY_NAME);
        });
      });
    });
  });
});
