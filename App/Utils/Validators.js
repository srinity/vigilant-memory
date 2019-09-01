import {
  isString as _isString,
  isEqual as _isEqual,
  isNil as _isNil,
  split as _split
} from 'lodash';

export function isEgyptPhone(value) {
  const phoneRegex = new RegExp(/^(\+2)?(01)[0-9]{9}$/);

  return _isString(value) && phoneRegex.test(value);
}

export function isEmail(value) {
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  return _isString(value) && emailRegex.test(value.trim());
}

export function isValidPassword(value) {
  return _isString(value) && value.trim().length >= 5;
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

  return (_isString(value) && charactersOnlyRegex.test(value.trim()));
}

export function exists(value) {
  return !_isNil(value);
}
