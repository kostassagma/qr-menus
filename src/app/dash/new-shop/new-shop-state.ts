import { create } from "zustand";
import { nanoid } from "nanoid";

interface ShopNameType {
  locale: string;
  text: string;
}

interface NewShopStateType {
  supported_languages: string[];
  shop_name: ShopNameType[];
  addLang: (lang: string) => void;
  removeLang: (lang: string) => void;
  editName: (lang: string, target: string) => void;
  pathname: string;
}

export const useNewShopState = create<NewShopStateType>()((set) => ({
  supported_languages: ["el", "en"],
  shop_name: [
    { locale: "el", text: "" },
    { locale: "en", text: "" },
  ],
  pathname: nanoid(),
  addLang: (lang: string) => {
    set((state) => ({
      supported_languages: [...state.supported_languages, lang],
      shop_name: [...state.shop_name, { locale: lang, text: "" }],
    }));
  },
  removeLang: (lang: string) => {
    set((state) => ({
      supported_languages: [
        ...state.supported_languages.filter((_lang) => _lang != lang),
      ],
      shop_name: [...state.shop_name.filter(({ locale }) => locale != lang)],
    }));
  },
  editName: (lang: string, target: string) => {
    set((state) => ({
      shop_name: [
        ...state.shop_name.map((e) =>
          e.locale == lang ? { ...e, text: target } : e
        ),
      ],
    }));
  },
}));
