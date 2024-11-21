"use client";
import { useAuthState } from "@/app/dash/auth-state";
import { FC, useEffect } from "react";
import { useEditCategoriesState } from "./edit-categories-state";

interface Props {
  shop: string;
  menuId: number;
  categories: {
    category_order: number;
    id: number;
    category_name: {
      locale: "en" | "gr" | "el";
      text: string;
    }[];
  }[];
}

const InitializeData: FC<Props> = ({ shop, categories, menuId }) => {
  const { shops } = useAuthState();
  const { initializeData } = useEditCategoriesState();

  useEffect(() => {
      if (!shops) return;
      const shopDetails = shops!.find((e) => e.pathname === shop);
      initializeData(menuId, shopDetails!.supported_languages, categories);
    
  }, [shops, shop, initializeData, menuId, categories]);

  return <></>;
};

export default InitializeData;
