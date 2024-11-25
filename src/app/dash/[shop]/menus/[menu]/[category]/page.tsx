import Link from "next/link";
import { createServerClient } from "@/utils/supabase/server";
import AddItems from "./edit-items";
import InitializeData from "./initialize-data";
import CommitItemsChanges from "./commmit-items-change";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ menu: string; shop: string; category: string }>;
}) {
  const { menu, category, shop } = await params;

  const supabase = await createServerClient();

  const categoryQuery = await supabase
    .from("categories")
    .select(
      `
        id,
        category_order,
        menu (pathname, shop (pathname, supported_languages)),
        items (
          item_order,
          id,
          price,
          items_name (
            locale,
            text
          )
        ),
        category_name (
          text,
          locale
        )
      `
    )
    .eq("category_order", parseInt(category))
    .eq("menu.pathname", menu)
    .limit(1);

  if (categoryQuery.error || !categoryQuery.data) return <></>;

  const categoryData = categoryQuery.data[0];

  return (
    <div className="flex-1 flex flex-col gap-3 w-full">
      <Link
        href={`/dash/${shop}/menus/${menu}`}
        className="hover:underline text-accent"
      >
        &#8592; Πίσω στον κατάλογο
      </Link>
      <h2 className="text-2xl font-bold">
        {categoryData.category_name.map((e) => e.text).join("/")}
      </h2>
      <AddItems />
      <InitializeData
        categoryId={categoryData.id}
        /* @ts-expect-error supabase bug */
        langs={categoryData.menu.shop.supported_languages}
        items={categoryData.items.map((e) => ({
          id: e.id,
          item_order: e.item_order,
          price: e.price,
          item_name: e.items_name.map((e) => ({
            locale: e.locale,
            text: e.text,
          })),
        }))}
      />
      <CommitItemsChanges menu={menu} shop={shop} />
      {/* <CommitCategoryChanges menu={menu} shop={shop} /> */}
    </div>
  );
}
