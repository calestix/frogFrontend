import en from '../translations/en/common.json';
import ar from '../translations/ar/common.json';

export const dictionaries = { en, ar };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en;
}
