import { attachmentMailUtil } from '../attachment.mail.util';
import { BOUNDARY } from '../mail.constants';
import type { AttachmentFile } from '../mail.types';

describe('Attachment mail utility tests', function testAttachmentUtilities() {
  const DESTINATION = 'src/mail/__tests__/';
  // in practice, [Multer will generate a random filename without an extension](https://github.com/expressjs/multer#diskstorage)
  const FILES = {
    TEST_ICON_JPG: {
      destination: DESTINATION,
      filename: 'test-icon.jpg',
      mimetype: 'image/jpg',
      originalname: 'test-icon.jpg',
    },
    TEST_ICON_PNG: {
      destination: DESTINATION,
      filename: 'test-icon.png',
      mimetype: 'image/png',
      originalname: 'test-icon.png',
    },
  };
  const TEST_ICON_JPG_ATTACHMENT = {
    name: 'test-icon.jpg',
    data: '/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1uWVIU3OcCo4JxcEum7y+ikjGaguLF7q7Bkk/cDnaOpPpV1VCqFUAAdAK0g6kpttWivx8zk1uf//Z',
    mimeType: 'image/jpg',
  };
  describe('buildAttachment tests', function testBuildAttachment() {
    it('should always return an attachment', async () => {
      const attachment = await attachmentMailUtil.buildAttachment(
        FILES.TEST_ICON_JPG
      );
      expect(attachment).toMatchObject(TEST_ICON_JPG_ATTACHMENT);
    });
  });
  describe('buildAttachments tests', function testBuildAttachments() {
    it('should always return an array of attachments', async () => {
      const attachments = await attachmentMailUtil.buildAttachments([
        FILES.TEST_ICON_JPG,
        FILES.TEST_ICON_PNG,
      ]);
      expect(attachments).toMatchObject<AttachmentFile[]>;
    });
  });
  describe('composeAttachment tests', function testComposeAttachment() {
    describe('When used for the final attachment', () => {
      const isFinalAttachment = true;
      it('should return an array with BOUNDARY.END as the last element', () => {
        const attachments = attachmentMailUtil.composeAttachment(
          TEST_ICON_JPG_ATTACHMENT,
          isFinalAttachment
        );
        expect(attachments[attachments.length - 1]).toBe(BOUNDARY.END);
      });
    });
    describe('When NOT used for the final attachment', () => {
      const isFinalAttachment = false;
      it('should return an array with BOUNDARY.NEXT as the last element', () => {
        const attachments = attachmentMailUtil.composeAttachment(
          TEST_ICON_JPG_ATTACHMENT,
          isFinalAttachment
        );
        expect(attachments[attachments.length - 1]).toBe(BOUNDARY.NEXT);
      });
    });
  });
  describe('composeAttachments tests', function testComposeAttachments() {
    describe('When attachments is an array', () => {
      let defaultAttachments: AttachmentFile[] = [];
      beforeEach(() => {
        defaultAttachments = [];
        const n = Math.random() * 10;
        for (let i = 0; i < n; i++) {
          defaultAttachments.push(TEST_ICON_JPG_ATTACHMENT);
        }
      });
      it('should return an array containing n - 1 BOUNDARY.NEXT', () => {
        const attachments =
          attachmentMailUtil.composeAttachments(defaultAttachments);
        const nextBoundaries = attachments.filter(
          (line) => line === BOUNDARY.NEXT
        );
        expect(nextBoundaries.length).toEqual(defaultAttachments.length - 1);
      });
      it('and one BOUNDARY.END as the last element', () => {
        const attachments =
          attachmentMailUtil.composeAttachments(defaultAttachments);
        expect(attachments[attachments.length - 1]).toEqual(BOUNDARY.END);
      });
    });
    describe('When attachments is a single attachment', () => {
      it('should return an array containing no BOUNDARY.NEXT', () => {
        const attachments = attachmentMailUtil.composeAttachments(
          TEST_ICON_JPG_ATTACHMENT
        );
        const nextBoundaries = attachments.filter(
          (line) => line === BOUNDARY.NEXT
        );
        expect(nextBoundaries.length).toEqual(0);
      });
      it('and one BOUNDARY.END as the last element', () => {
        const attachments = attachmentMailUtil.composeAttachments(
          TEST_ICON_JPG_ATTACHMENT
        );
        expect(attachments[attachments.length - 1]).toEqual(BOUNDARY.END);
      });
    });
  });
});
