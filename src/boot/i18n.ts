import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import { STORAGE_KEYS } from 'src/shared/constants/storage-keys';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['ru-RU'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

// Функция для определения начальной локали
function getInitialLocale(): MessageLanguages {
  // Проверяем localStorage на наличие сохраненной локали
  const savedLocale = localStorage.getItem(STORAGE_KEYS.USER_LOCALE) as MessageLanguages | null;
  
  if (savedLocale && savedLocale in messages) {
    return savedLocale;
  }

  // Если в localStorage нет, определяем язык браузера
  const browserLang = navigator.language;
  
  // Проверяем точное совпадение
  if (browserLang in messages) {
    return browserLang as MessageLanguages;
  }

  // Проверяем основную часть языка (например, 'en' из 'en-US')
  const mainLang = browserLang.split('-')[0];
  const availableLangs = Object.keys(messages);
  
  const matchingLang = availableLangs.find(lang => 
    lang.split('-')[0] === mainLang
  );
  
  if (matchingLang) {
    return matchingLang as MessageLanguages;
  }

  // Возвращаем русский как fallback
  return 'ru-RU';
}

export default defineBoot(({ app }) => {
  const initialLocale = getInitialLocale();
  
  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: initialLocale, // Используем динамически определенную локаль
    legacy: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages as any,
  });

  // Сохраняем выбранную локаль в localStorage (если еще не сохранена)
  if (!localStorage.getItem(STORAGE_KEYS.USER_LOCALE)) {
    localStorage.setItem(STORAGE_KEYS.USER_LOCALE, initialLocale);
  }

  // Set i18n instance on app
  app.use(i18n);
});