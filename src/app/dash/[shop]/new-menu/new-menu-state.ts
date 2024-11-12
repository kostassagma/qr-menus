import { create } from "zustand";
import { nanoid } from "nanoid";

export interface MenuNameType {
  locale: string;
  text: string;
}

export interface NewShopStateType {
  shop_name: MenuNameType[];
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
