"use client";
import { FC, useEffect } from "react";
import { useEditItemsState } from "./edit-items-state";

interface Props {
  categoryId: number;
  langs: string[];
  items: {
    item_order: number;
    id: number;
    item_name: {
      locale: "en" | "gr" | "el";
      text: string;
    }[];
  }[];
}

const InitializeData: FC<Props> = ({ items, langs, categoryId }) => {
  const { initializeData } = useEditItemsState();

  useEffect(() => {
    initializeData(categoryId, langs, items);
  }, [categoryId, langs, initializeData, items]);

  return <></>;
};

export default InitializeData;
