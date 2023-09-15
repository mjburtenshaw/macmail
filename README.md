macmail
=======

A library to streamline the composition of SMTP compliant emails using react-email templates to send off to mail vendors.

![Static Badge](https://img.shields.io/badge/version-1.1.0-66023c)

Table of Contents
------------------

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Library](#library)
  - [Mail](#mail)
    - [Participants](#participants)
    - [Headers](#headers)
    - [Body](#body)
    - [Attachments](#attachments)
    - [Letters](#letters)
- [See Also](#see-also)

Installation
------------

```shell
npm install @mjburtenshaw/macmail
```

Configuration
-------------

Add a `macmail.config.yml` to your project's root directory:

```yaml
# Required. An email address appended to BCC headers on production environments.
production_dev_recipient: dev.team@example.com

# Optional. An email address only used in non-production environments.
my_email_address: me@example.com

# Optional. A string. A companion to my_email_address.
my_name: Firstname Lastname
```

Usage
------s

[`composeMessage()`](src/mail/message.mail.util.ts) is the main function of the library.

Library
-------

### Mail

The purpose of mail utilities is to parse input in a way that's [Simple Mail Transfer Protocol (SMTP) compliant](https://datatracker.ietf.org/doc/html/rfc5321).

[`composeMessage`](src/mail/message.mail.util.ts) is the main function of the utility library.

#### Participants

`formatParticipants` is the main function of [the participant utilities](src/mail/participant.mail.util.ts).

The API uses participants defined using an address, e.g., `test@example.com`, or a username-address combination in JSON:

```json
{
  "address": "harry@hsww.edu",
  "username": "Harry Potter"
}
```

The username-address combination is preferred when possible.

When formatting for SMTP, we format the username-address combination like so: `Harry Potter <harry@hsww.edu>`.

We delimit multiple participants using a comma and space. It is valid to have a mix of addresses and username-address combinations in the same participant string.

#### Headers

`composeHeaders` is the main function of [the header utilities](src/mail/header.mail.util.ts).

SMTP requires the following headers:
1. From: an SMTP participant.
2. To: an SMTP participant or series of them.
3. Subject: a string.
4. Content-Type: a MIME type.
5. MIME-Version: 1.0.

> 🚨 *Google will override the From header with the authenticated client user when using them as a mail client.*

🔤 The header keys *should* be Pascal-Kebab case, but SMTP isn't picky about this.

🤖 We will encode the subject header in case it has stuff like emojis.

🤷‍♂️ CC and BCC are optional headers. Content-Transfer-Encoding and a boundary are required, depending on the MIME type.

🎯 We want to prevent misfires to recipients when operating in non-production environments, so we will override the recipients with the developer's address if it's defined, otherwise a configured MACMAIL_PRODUCTION_DEV_RECIPIENT.

🕵️ We also want to add a configured MACMAIL_PRODUCTION_DEV_RECIPIENT as a blind carbon copy on everything we send out for auditing purposes.

#### Body

`composeBody` is the main function of [the body utilities](src/mail/body.mail.util.ts).

The body is required to render [a letter](#letters) merged with data. Preferrably the body content type is HTML, but plain text is available.

If the email has mixed content, the body section must have its own Content-Type headers and boundary.

#### Attachments

📖 In this context, we refer to **files** as inputs and **attachments** as outputs.

`composeAttachments` is the main function of [the attachment utilities](src/mail/attachment.mail.util.ts).

SMTP-compliant attachments contain the following information:
- The file name.
- The file MIME type.
- The file data.

We have a utility, [`buildAttachment`](src/mail/attachment.mail.util.ts) that accepts a Multer file and packages it as an SMTP-compliant attachment.

An attachment will always have a boundary because email's content type will always be multipart/mixed if it contains attachments. Whether or not the boundary is NEXT or END simply depends on if it is the last attachment.

### Letters

The objective of letter utilities is to faciliate the composition and formatting of letters to serve over SMTP.

[`render`](src/letter/letter.util.ts) serves as the main function of the utilities in this directory.

Letter templates are coded using [React Email](https://react.email/docs/introduction). They provide an elegant solution for creating email template on a server.

A letter template MUST have the following properties:
- A React function component as the default export.
- The same React function component as a named export.
- An array of strings matching the keys of required component props assigned to a constant named `requiredProps` as a named export.

A letter template SHOULD have the following properties:
- A PascalCase filename followed by `.letter.tsx`, e.g. `FooBar.letter.tsx`

See Also
--------

- [RFC 5321](https://datatracker.ietf.org/doc/html/rfc5321)
- [Multer](https://github.com/expressjs/multer#readme)
- [Multer `DiskStorage`: How Multer creates URIs](https://github.com/expressjs/multer#diskstorage)
- [React Email](https://react.email/docs/introduction)
