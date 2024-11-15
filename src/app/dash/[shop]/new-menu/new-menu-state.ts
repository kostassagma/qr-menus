import { create } from "zustand";
import { nanoid } from "nanoid";

interface MenuNameType {
  locale: string;
  text: string;
}

interface CategoryNameType {
  locale: string;
  text: string;
}

interface ItemNameType {
  locale: string;
  text: string;
}

interface ItemType {
  name: ItemNameType[];
  order: number;
}

export interface NewCategoryType {
  name: CategoryNameType[];
  order: number;
  items: ItemType[];
  height: number;
}

export interface NewMenuStateType {
  supported_languages: string[];
  menu_name: MenuNameType[];
  editName: (lang: string, target: string) => void;
  pathname: string;
  categories: NewCategoryType[];
  addCategory: () => void;
  reOrder: (oldOrder: number, newOrder: number) => void;
  dragging?: {
    oldOrder: number;
    newOrder: number;
  };
  drag: (oldOrder: number, newOrder: number) => void;
}

export const useNewMenuState = create<NewMenuStateType>()((set) => ({
  supported_languages: ["el", "en"],
  menu_name: [
    { locale: "el", text: "" },
    { locale: "en", text: "" },
  ],
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
  categories: [],
  addCategory: () => {
    set((state) => ({
      dragging: undefined,
      categories: [
        ...state.categories,
        {
          height: calculateHeight(0, 0),
          name: state.supported_languages.map((lang) => ({
            locale: lang,
            text: "",
          })),
          items: [],
          order: state.categories.length,
        },
      ],
    }));
  },
  reOrder: (oldOrder: number, newOrder: number) => {
    if (oldOrder == newOrder) return;
    set((state) => ({
      dragging: undefined,
      categories: state.categories.map((e) => {
        if (
          (e.order < newOrder && newOrder < oldOrder) ||
          (e.order < oldOrder && oldOrder < newOrder) ||
          (e.order > newOrder && newOrder > oldOrder) ||
          (e.order > oldOrder && oldOrder > newOrder)
        ) {
          return e;
        } else if (e.order == oldOrder) {
          return {
            ...e,
            order: newOrder,
          };
        } else {
          return {
            ...e,
            order: oldOrder > newOrder ? e.order + 1 : e.order - 1,
          };
        }
      }),
    }));
  },
  drag: (oldOrder: number, newOrder: number) => {
    set(() => ({
      dragging: { newOrder, oldOrder },
    }));
  },
  dragging: undefined,
}));

function calculateHeight(langs: number, items: number) {
  return 236 + 20;
}
