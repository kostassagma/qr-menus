"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SelectLanguages from "./select-languages";
import SetName from "./set-name";
import UploadImages from "./upload-image";
import { ShopNameType, useNewShopState } from "./new-shop-state";
import toast from "react-hot-toast";
import { createBrowserClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useAuthState } from "../auth-state";
import { createShop } from "./actions";

export default function NewShop() {
  const { pathname, supported_languages, shop_name } = useNewShopState();
  const { refresh } = useAuthState();

  async function _createShop() {
    if (
      !pathname ||
      !shop_name ||
      !supported_languages ||
      supported_languages.length == 0
    ) {
      toast.error("Συμπληρώστε όλα τα υποχρεωτικά πεδία");
      return;
    }
    let name: ShopNameType[] = [];
    try {
      name = supported_languages.map((lang) => {
        const shopName = shop_name.filter(({ locale }) => {
          return locale == lang;
        })[0];
        if (!shopName) {
          toast.error("Συμπληρώστε όλες τις διαλέκτους!");
          throw new Error("");
        }
        return shopName;
      });
    } catch (err) {
      return err;
    }

    const supabase = await createBrowserClient();

    const supabaseUser = await supabase.auth.getUser();

    if (supabaseUser.error || !supabaseUser.data.user) {
      toast.error("Κάτι πήγε λάθος");
      return;
    }

    const { data, error } = await supabase
      .from("shops")
      .insert({
        pathname: pathname,
        supported_languages,
        owner: supabaseUser.data.user.id,
      })
      .select();

    console.log(data);

    if (error || !data[0]) {
      toast.error("Κάτι πήγε στραβά");
      return;
    }

    await supabase.from("shop_names").insert(
      //@ts-expect-error because locale is str but supabase expects el|en
      name.map(({ locale, text }) => ({
        locale,
        text,
        shop: data[0].id,
      }))
    );

    await refresh();

    return redirect(`/dash/${pathname}`);
  }

  return (
    <>
      <div className="min-h-screen">
        <DashNav />
        <form
          action={createShop}
          className="p-4 max-w-5xl w-full mx-auto flex flex-col gap-5 py-10"
        >
          <h1 className="text-2xl mb-4 font-bold">Δημιουργία Μαγαζιού</h1>
          <SelectLanguages />
          <SetName />
          <UploadImages />
          <input
            required={true}
            value={pathname}
            hidden
            name="pathname"
            readOnly
          />
          <input
            required={true}
            value={JSON.stringify(supported_languages)}
            hidden
            name="supported_languages"
            readOnly
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out m-auto"
          >
            Δημιουργία Μαγαζιού
          </button>
        </form>
      </div>
      <BigFooter />
    </>
  );
}
