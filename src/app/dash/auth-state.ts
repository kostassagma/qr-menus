import { create } from "zustand";
import { createBrowserClient } from "@/utils/supabase/client";

export interface ShopNameType {
  locale: string;
  text: string;
}

export interface ShopStateType {
  supported_languages: string[];
  shop_name: ShopNameType[];
  pathname: string;
}

export interface AuthStateType {
  email?: string;
  shops?: ShopStateType[];
}

export const useAuthState = create<AuthStateType>()((set) => {
  (async () => {
    const supabase = await createBrowserClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const shops = await supabase.from("shops").select(`
      pathname,
      supported_languages,
      shop_names (
        locale,
        text
      )
    `);

    if (!shops.data) return;
console.log(shops);

    set({
      email: data.user!.email,
      // @ts-expect-error bc e.supported_languages is JSON and shops expects string[]
      shops: shops.data.map((e) => ({
        pathname:e.pathname,
        supported_languages: e.supported_languages,
        shop_name: e.shop_names.map((e) => ({
          locale: e.locale,
          text: e.text,
        })),
      })),
    });
  })();
  return {};
});
