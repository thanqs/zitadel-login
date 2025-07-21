export interface Lang {
  name: string;
  code: string;
}

export const LANGS: Lang[] = [
  {
    name: "Nederlands",
    code: "nl",
  },
  {
    name: "English",
    code: "en",
  },
  {
    name: "Deutsch",
    code: "de",
  },
];

export const LANGUAGE_COOKIE_NAME = "NEXT_LOCALE";
export const LANGUAGE_HEADER_NAME = "accept-language";
