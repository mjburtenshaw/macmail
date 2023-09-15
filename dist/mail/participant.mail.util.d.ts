import type { MailAddress, SmtpParticipant } from './mail.types';
declare function isMailAddress(candidate: any): candidate is MailAddress;
declare function isSmtpParticipant(candidate: any): candidate is SmtpParticipant;
declare function getDevRecipient(): SmtpParticipant;
declare function formatParticipant(participant: SmtpParticipant): string;
declare function formatParticipants(participantEntry: SmtpParticipant | SmtpParticipant[]): string;
export declare const participantMailUtil: {
    devRecipients: SmtpParticipant[];
    formatParticipant: typeof formatParticipant;
    formatParticipants: typeof formatParticipants;
    getDevRecipient: typeof getDevRecipient;
    isMailAddress: typeof isMailAddress;
    isSmtpParticipant: typeof isSmtpParticipant;
};
export {};
