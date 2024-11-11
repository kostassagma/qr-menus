import { create } from "zustand";
import { nanoid } from "nanoid";

interface NewShopStateType {
  supported_languages: string[];
  addLang: (lang: string) => void;
  removeLang: (lang: string) => void;
  pathname: string;
}

export const useNewShopState = create<NewShopStateType>()((set) => ({
  supported_languages: ["el", "en"],
  pathname: nanoid(),
  addLang: (lang: string) => {
    set((state) => ({
      supported_languages: [...state.supported_languages, lang],
    }));
  },
  removeLang: (lang: string) => {
    set((state) => ({
      supported_languages: [
        ...state.supported_languages.filter((_lang) => _lang != lang),
      ],
    }));
  },
}));
