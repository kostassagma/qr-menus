import { create } from "zustand";
import { nanoid } from "nanoid";

export interface MenuNameType {
  locale: string;
  text: string;
}


export interface NewMenuStateType {
  supported_languages: string[];
  menu_name: MenuNameType[];
  editName: (lang: string, target: string) => void;
  pathname: string;
  setSupportedLanguages: (langs: string[]) => void;
}

export const useNewMenuState = create<NewMenuStateType>()((set) => ({
  supported_languages: [],
  menu_name: [],
  pathname: nanoid(),
  editName: (lang: string, target: string) => {
    set((state) => ({
      menu_name: [
        ...state.menu_name.map((e) =>
          e.locale == lang ? { ...e, text: target } : e
        ),
      ],
    }));
  },
  setSupportedLanguages: (langs: string[]) => {
    set({
      supported_languages: langs,
      menu_name: langs.map((e) => ({ locale: e, text: "" })),
    });
  },
}));

function calculateHeight(langs: number) {
  return 44 + langs * 62 + 20;
}
