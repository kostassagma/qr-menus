import { create } from "zustand";

interface ItemNameType {
  locale: string;
  text: string;
}

export interface ItemType {
  name: ItemNameType[];
  item_order: number;
  height: number;
  price: string;
  id?: number;
}

export interface NewMenuStateType {
  supported_languages: string[];
  categoryId: number;
  // items
  items: ItemType[];
  addItem: () => void;
  reOrder: (oldOrder: number, newOrder: number) => void;
  dragging?: {
    oldOrder: number;
    newOrder: number;
  };
  drag: (oldOrder: number, newOrder: number) => void;
  deleteItem: (order: number) => void;
  editItemName: (order: number, lang: string, target: string) => void;
  editItemPrice: (order: number, target: string) => void;
  initializeData: (
    categoryId: number,
    langs: string[],
    items: {
      item_order: number;
      id: number;
      price: string;
      item_name: {
        locale: "en" | "gr" | "el";
        text: string;
      }[];
    }[]
  ) => void;
}

export const useEditItemsState = create<NewMenuStateType>()((set) => ({
  supported_languages: [],
  categoryId: 0,
  // items
  items: [],
  addItem: () => {
    set((state) => ({
      dragging: undefined,
      items: [
        ...state.items,
        {
          height: calculateHeight(state.supported_languages.length),
          name: state.supported_languages.map((lang) => ({
            locale: lang,
            text: "",
          })),
          item_order: state.items.length,
          price: "",
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
      items: state.items.map((e) => {
        if (
          (e.item_order < newOrder && newOrder < oldOrder) ||
          (e.item_order < oldOrder && oldOrder < newOrder) ||
          (e.item_order > newOrder && newOrder > oldOrder) ||
          (e.item_order > oldOrder && oldOrder > newOrder)
        ) {
          return e;
        } else if (e.item_order == oldOrder) {
          return {
            ...e,
            item_order: newOrder,
          };
        } else {
          return {
            ...e,
            item_order:
              oldOrder > newOrder ? e.item_order + 1 : e.item_order - 1,
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
  deleteItem: (order: number) => {
    set((state) => ({
      items: state.items
        .filter((e) => e.item_order != order)
        .map((e) => ({
          ...e,
          order: e.item_order > order ? e.item_order - 1 : e.item_order,
        })),
    }));
  },
  dragging: undefined,
  editItemName: (order: number, lang: string, target: string) => {
    set((state) => ({
      items: state.items.map((e) =>
        e.item_order == order
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
  editItemPrice: (order: number, target: string) => {
    set((state) => ({
      items: state.items.map((e) =>
        e.item_order == order ? { ...e, price: target } : e
      ),
    }));
  },
  initializeData: (
    categoryId: number,
    langs: string[],
    items: {
      id: number;
      item_order: number;
      price: string;
      item_name: {
        locale: "en" | "gr" | "el";
        text: string;
      }[];
    }[]
  ) => {
    set({
      supported_languages: langs,
      categoryId,
      items: items.map((e) => ({
        name: e.item_name,
        height: calculateHeight(langs.length),
        item_order: e.item_order,
        id: e.id,
        price: e.price,
      })),
    });
  },
}));

function calculateHeight(langs: number) {
  return 44 + langs * 62 + 20 + 40 + 62;
}
