export const checkMaxLength = (value, len) =>
  value && value.length <= len
    ? undefined
    : `must be less than ${len} characters`;

export const checkMinLength = (value, len) =>
  value && value.length >= len
    ? undefined
    : `must be more than ${len} characters`;

export const checkValidChars = value =>
  /^[a-zA-Z0-9_-]+$/.test(value) ? undefined : 'contains invalid characters';

export const checkIfTrimmed = value =>
  value.trim() === value ? undefined : 'cannot start or end with whitespace';

export const validUrl = value => {
  try {
    new URL(value);
    return undefined;
  } catch (error) {
    return 'must be a valid url';
  }
};

const max = len => value => checkMaxLength(value, len);
const min = len => value => checkMinLength(value, len);
const validChars = value => checkValidChars(value);
const trimmed = value => checkIfTrimmed(value);

export const required = value => (value ? undefined : 'required');
export const postType = value =>
  value === 'link' || value === 'text' || value === 'upload'
    ? undefined
    : 'must be link or text post';
export const usernameValidator = [
  required,
  max(21),
  min(3),
  validChars,
  trimmed
];
export const titleValidator = value =>
  required(value) || checkMaxLength(value, 100);
export const forumNameValidator = [
  required,
  max(21),
  min(3),
  validChars,
  trimmed
];
export const forumDescriptionValidator = [required, min(1)];
export const forumRulesValidator = [required, min(1)];
export const reportValidator = [required, min(1)];
export const wageValidator = [required, min(0), max(100)];
export const textPostValidator = value =>
  required(value) || checkMinLength(value, 4);
export const urlValidator = value => required(value) || validUrl(value);
export const typeValidator = value => required(value) || postType(value);
