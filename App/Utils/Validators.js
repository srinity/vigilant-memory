import {
  isString as _isString,
  isEqual as _isEqual,
  isNil as _isNil,
  split as _split
} from 'lodash';

export function isEmail(value) {
  const emailRegex = new RegExp(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

  return _isString(value) && emailRegex.test(value);
}

export function isValidPassword(value) {
  return _isString(value) && value.length >= 6;
}

export function isValidConfirmPassword(password, confirmPassword) {
  return _isString(password) && _isString(confirmPassword) && _isEqual(password, confirmPassword);
}

export function isValidName(value) {
  const charactersOnlyRegex = /^[a-zA-Z]+$/;

  if (!_isString(value)) {
    return false;
  }

  const valueArr = _split(value, ' ');

  if (valueArr.length < 2) {
    return false;
  }

  let isValid = true;

  for (let currentValue of valueArr) {
    isValid = isValid && charactersOnlyRegex.test(currentValue);
  }

  return isValid;
}

export function isValidFirstOrLastName(value) {
  const charactersOnlyRegex = /^[a-zA-Z]+$/;

  return (_isString(value) && charactersOnlyRegex.test(value));
}

export function exists(value) {
  return !_isNil(value);
}
