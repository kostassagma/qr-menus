"use client";
import { createBrowserClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEditItemsState } from "./edit-items-state";

export default function CommitItemsChanges({
  shop,
  menu,
}: {
  shop: string;
  menu: string;
}) {
  const { categoryId, items, supported_languages } = useEditItemsState();

  async function createMenu() {
    const supabase = await createBrowserClient();

    await items.forEach(async (item) => {
      if (item.id) {
        const { error } = await supabase
          .from("items")
          .update({ item_order: item.item_order })
          .eq("id", item.id);

        if (error) return;

        await supported_languages.forEach(async (lang) => {
          const { error } = await supabase
            .from("items_name")
            .update({
              text: item.name.find((e) => e.locale === lang)!.text,
            })
            .eq("item", item.id!)
            .eq("locale", lang);

          if (error) throw new Error();
        });
      } else {
        const insertedItem = await supabase
          .from("items")
          .insert({
            category: categoryId,
            item_order: item.item_order,
            price: item.price
          })
          .select("id");

        console.log(insertedItem.error);

        if (insertedItem.error || !insertedItem.data) return;

        await supabase.from("items_name").insert(
          //@ts-expect-error because locale is str but supabase expects el|en
          item.name.map((e) => ({
            locale: e.locale,
            text: e.text,
            item: insertedItem.data[0].id,
          }))
        );
      }
    });

    redirect(`/dash/${shop}/menus/${menu}`);
  }

  return (
    <button
      onClick={async () => {
        await createMenu();
      }}
      type="submit"
      className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-[1.02] transition ease-in-out mt-auto mx-auto z-10"
    >
      Αποθήκευση των αλλαγών
    </button>
  );
}
