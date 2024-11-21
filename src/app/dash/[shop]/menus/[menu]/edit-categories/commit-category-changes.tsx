"use client";
import { createBrowserClient } from "@/utils/supabase/client";
import { useEditCategoriesState } from "./edit-categories-state";
import { redirect } from "next/navigation";

export default function CommitCategoryChanges({
  shop,
  menu,
}: {
  shop: string;
  menu: string;
}) {
  const { menuId, categories, supported_languages } = useEditCategoriesState();

  async function createMenu() {
    const supabase = await createBrowserClient();

    await categories.forEach(async (category) => {
      if (category.id) {
        const { error } = await supabase
          .from("categories")
          .update({ order: category.order })
          .eq("id", category.id);

        if (error) return;

        await supported_languages.forEach(async (lang) => {
          const { error } = await supabase
            .from("category_name")
            .update({
              text: category.name.find((e) => e.locale === lang)!.text,
            })
            .eq("category", category.id!)
            .eq("locale", lang);

          if (error) throw new Error();
        });
      } else {
        const insertedCategory = await supabase
          .from("categories")
          .insert({
            menu: menuId,
            order: category.order,
          })
          .select("id");

        console.log(insertedCategory.error);

        if (insertedCategory.error || !insertedCategory.data) return;

        await supabase.from("category_name").insert(
          //@ts-expect-error because locale is str but supabase expects el|en
          category.name.map((e) => ({
            locale: e.locale,
            text: e.text,
            category: insertedCategory.data[0].id,
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
