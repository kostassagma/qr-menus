import { create } from "zustand";

export interface MenuNameType {
  locale: string;
  text: string;
}

interface CategoryNameType {
  locale: string;
  text: string;
}

export interface CategoryType {
  name: CategoryNameType[];
  category_order: number;
  height: number;
  id?: number;
}

export interface NewMenuStateType {
  supported_languages: string[];
  menuId: number;
  initializeData: (
    menuId: number,
    langs: string[],
    categories: {
      category_order: number;
      id: number;
      category_name: {
        locale: "en" | "gr" | "el";
        text: string;
      }[];
    }[]
  ) => void;
  // categories
  categories: CategoryType[];
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

export const useEditCategoriesState = create<NewMenuStateType>()((set) => ({
  supported_languages: [],
  menuId: 0,
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
          category_order: state.categories.length,
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
          (e.category_order < newOrder && newOrder < oldOrder) ||
          (e.category_order < oldOrder && oldOrder < newOrder) ||
          (e.category_order > newOrder && newOrder > oldOrder) ||
          (e.category_order > oldOrder && oldOrder > newOrder)
        ) {
          return e;
        } else if (e.category_order == oldOrder) {
          return {
            ...e,
            category_order: newOrder,
          };
        } else {
          return {
            ...e,
            category_order: oldOrder > newOrder ? e.category_order + 1 : e.category_order - 1,
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
        .filter((e) => e.category_order != order)
        .map((e) => ({ ...e, order: e.category_order > order ? e.category_order - 1 : e.category_order })),
    }));
  },
  dragging: undefined,
  editCategoryName: (order: number, lang: string, target: string) => {
    set((state) => ({
      categories: state.categories.map((e) =>
        e.category_order == order
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
  initializeData: (
    menuId: number,
    langs: string[],
    categories: {
      id: number;
      category_order: number;
      category_name: {
        locale: "en" | "gr" | "el";
        text: string;
      }[];
    }[]
  ) => {
    set({
      supported_languages: langs,
      menuId,
      categories: categories.map((e) => ({
        name: e.category_name,
        height: calculateHeight(langs.length),
        category_order: e.category_order,
        id: e.id,
      })),
    });
  },
}));

function calculateHeight(langs: number) {
  return 44 + langs * 62 + 20;
}
