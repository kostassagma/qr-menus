import { create } from "zustand";
import { nanoid } from "nanoid";

export interface MenuNameType {
  locale: string;
  text: string;
}

interface CategoryNameType {
  locale: string;
  text: string;
}

export interface NewCategoryType {
  name: CategoryNameType[];
  order: number;
  height: number;
}

export interface NewMenuStateType {
  supported_languages: string[];
  menu_name: MenuNameType[];
  editName: (lang: string, target: string) => void;
  pathname: string;
  setSupportedLanguages: (langs: string[]) => void;
  // categories
  categories: NewCategoryType[];
  addCategory: () => void;
  reOrder: (oldOrder: number, newOrder: number) => void;
  dragging?: {
    oldOrder: number;
    newOrder: number;
  };
  drag: (oldOrder: number, newOrder: number) => void;
  deleteCategory: (order: number) => void;
  editCategoryName: (order: number, lang: string, target: string) => void;
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
  // categories
  categories: [],
  addCategory: () => {
    set((state) => ({
      dragging: undefined,
      categories: [
        ...state.categories,
        {
          height: calculateHeight(state.supported_languages.length),
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
    if (oldOrder == newOrder) {
      set({ dragging: undefined });
      return;
    }
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
  deleteCategory: (order: number) => {
    set((state) => ({
      categories: state.categories
        .filter((e) => e.order != order)
        .map((e) => ({ ...e, order: e.order > order ? e.order - 1 : e.order })),
    }));
  },
  dragging: undefined,
  editCategoryName: (order: number, lang: string, target: string) => {
    set((state) => ({
      categories: state.categories.map((e) =>
        e.order == order
          ? {
              ...e,
              name: e.name.map((e) =>
                e.locale == lang ? { ...e, text: target } : e
              ),
            }
          : e
      ),
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
