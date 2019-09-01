import { findIndex as _findIndex } from 'lodash';
import colorNames from './RNColorNames';

export const colorPropType = (props, propName, componentName) => {
  if (!isColor(props[propName])) {
    return new Error(`Invalid prop ${propName} passed to component ${componentName}, invalid color value.
    Value passed "${props[propName]}" expected a valid hex, rgb, rgba, hsl, hsla or a valid RN color name.`);
  }
};

function isColor(propValue) {
  const validColorName = _findIndex(colorNames, value => value === propValue) !== -1;
  
  return propValue === undefined || validColorName || isHexColorCode(propValue) || isRGBColor(propValue) ||
    isRGBAColor(propValue) || isHSLColor(propValue) || isHSLAColor(propValue);
}

function isHexColorCode(value) {
  return /^#(?:[A-Fa-f0-9]{3}){1,2}$/i.test(value);
}

function isRGBColor(value) {
  return /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/i.test(value);
}

function isRGBAColor(value) {
  return /^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0+)?)\s*[)]$/i.test(value);
}

function isHSLColor(value) {
  return /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/i.test(value);
}

function isHSLAColor(value) {
  return /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0+)?)\s*[)]$/i.test(value);
}
