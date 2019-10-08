import I18n from 'react-native-i18n';

import Translations from './Translations';

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'en';

I18n.translations = {
  ...Translations
};

export function getLocale() {
  return I18n.locale;
}

export function setLocale(locale) {
  I18n.locale = locale;
}
