import type { MailAddress, SmtpParticipant } from './mail.types';

function isMailAddress(candidate: any): candidate is MailAddress {
  if (typeof candidate !== 'string') {
    return false;
  }
  if (!candidate) {
    return false;
  }
  const usernameDomain = candidate.split('@');
  if (usernameDomain.length !== 2 || usernameDomain.some((part) => !part)) {
    return false;
  }
  const domain = usernameDomain[1];
  const subdomainTld = domain.split('.');
  if (subdomainTld.length !== 2 || subdomainTld.some((part) => !part)) {
    return false;
  }
  return true;
}

function isSmtpParticipant(candidate: any): candidate is SmtpParticipant {
  if (typeof candidate === 'string') {
    return isMailAddress(candidate);
  }
  if (typeof candidate === 'object') {
    const keys = Object.keys(candidate);
    const requiredKeys = ['address', 'username'];
    if (keys.length !== 2 || !requiredKeys.every((key) => keys.includes(key))) {
      return false;
    }
    if (typeof candidate.username !== 'string') {
      return false;
    }
    return isMailAddress(candidate.address);
  }
  return false;
}

function getDevRecipient() {
  const {
    ENV,
    MACMAIL_MY_EMAIL_ADDRESS,
    MACMAIL_MY_NAME,
    MACMAIL_PRODUCTION_DEV_RECIPIENT,
  } = process.env;
  let meRecipient: SmtpParticipant =
    (MACMAIL_MY_EMAIL_ADDRESS as MailAddress) ||
    (MACMAIL_PRODUCTION_DEV_RECIPIENT as MailAddress);
  if (MACMAIL_MY_EMAIL_ADDRESS && MACMAIL_MY_NAME) {
    meRecipient = {
      address: MACMAIL_MY_EMAIL_ADDRESS as MailAddress,
      username: MACMAIL_MY_NAME,
    };
  }
  const devRecipient =
    ENV === 'production'
      ? (MACMAIL_PRODUCTION_DEV_RECIPIENT as MailAddress)
      : meRecipient;
  return devRecipient;
}

function formatParticipant(participant: SmtpParticipant) {
  if (typeof participant === 'string') {
    return participant;
  }
  const { username, address } = participant;
  return `${username} <${address}>`;
}

function formatParticipants(
  participantEntry: SmtpParticipant | SmtpParticipant[]
) {
  if (Array.isArray(participantEntry)) {
    const formattedParticipants = participantEntry.map(formatParticipant);
    return formattedParticipants.join(', ');
  }
  return formatParticipant(participantEntry);
}

export const participantMailUtil = {
  formatParticipant,
  formatParticipants,
  getDevRecipient,
  isMailAddress,
  isSmtpParticipant,
};
