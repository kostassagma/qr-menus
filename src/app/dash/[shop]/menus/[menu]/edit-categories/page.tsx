import { createServerClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";
import AddCategories from "./edit-categories";
import InitializeData from "./initialize-data";
import CommitCategoryChanges from "./commit-category-changes";
import Link from "next/link";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ menu: string; shop: string }>;
}) {
  const { menu, shop } = await params;

  const supabase = await createServerClient();

  const menuQuery = await supabase
    .from("menus")
    .select(
      `
        id,
        menu_names (
          locale,
          text
        ),
        pathname,
        categories (
          id,
          category_order,
          category_name (
            locale, text
          )
        )
      `
    )
    .eq("pathname", menu)
    .limit(1);

  if (menuQuery.error || !menuQuery.data) {
    permanentRedirect(`/dash/${shop}`);
  }

  const menuData = menuQuery.data[0];

  return (
    <div className="flex-1 flex flex-col gap-3 w-full">
      <Link
        href={`/dash/${shop}/menus/${menu}`}
        className="hover:underline text-accent"
      >
        &#8592; Πίσω στον κατάλογο
      </Link>
      <h2 className="text-2xl font-bold">
        {menuData.menu_names.map((e) => e.text).join("/")}
      </h2>
      <InitializeData
        shop={shop}
        categories={menuData.categories}
        menuId={menuData.id}
      />
      <AddCategories />
      <CommitCategoryChanges menu={menu} shop={shop} />
    </div>
  );
}
