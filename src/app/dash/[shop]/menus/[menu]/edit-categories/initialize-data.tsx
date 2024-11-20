"use client";
import { useAuthState } from "@/app/dash/auth-state";
import { FC, useEffect } from "react";
import { useEditCategoriesState } from "./edit-categories-state";
import { createBrowserClient } from "@/utils/supabase/client";

interface Props {
  shop: string;
  menuId: number;
  categories: {
    order: number;
    id: number;
    category_name: {
      locale: "en" | "gr" | "el";
      text: string;
    }[];
  }[];
}

const InitializeData: FC<Props> = ({ shop, categories, menuId }) => {
  const { shops } = useAuthState();
  const { initializeData, supported_languages } = useEditCategoriesState();

  console.log(supported_languages);

  useEffect(() => {
      if (!shops) return;
      const shopDetails = shops!.find((e) => e.pathname === shop);
      initializeData(menuId, shopDetails!.supported_languages, categories);
    
  }, [shops, shop, initializeData]);

  return <></>;
};

export default InitializeData;
