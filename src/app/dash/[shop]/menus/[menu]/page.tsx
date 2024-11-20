import Link from "next/link";
import { createServerClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";

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
        menu_names (
          locale,
          text
        ),
        pathname,
        categories (
          order,
          category_name (
            locale, text
          ),
          items (
            id
          )
        )
      `
    )
    .eq("pathname", menu)
    .limit(1);

  console.log(menuQuery.data);

  if (menuQuery.error || !menuQuery.data) {
    permanentRedirect(`/dash/${shop}`);
  }

  const menuData = menuQuery.data[0];

  return (
    <div className="flex-1 flex flex-col gap-3 w-full">
      <Link
        href={`/dash/${shop}/menus`}
        className="hover:underline text-accent"
      >
        &#8592; Πίσω στους καταλόγους
      </Link>
      <h2 className="text-2xl font-bold">
        {menuData.menu_names.map((e) => e.text).join("/")}
      </h2>
      <p>Οι κατηγορίες του καταλόγου:</p>
      {menuData.categories.length != 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {menuData.categories.map((category, i) => (
            <Link
              href={`/dash/${shop}/menus/${menu}/${category.order}`}
              key={i}
              className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 w-full flex flex-col gap-1"
            >
              <h2 className="text-xl font-semibold">
                {category.category_name.map((e) => e.text).join("/")}
              </h2>
              <p>{category.category_name.length === 0 ? "" : ""}</p>
              <p>Αυτή η κατηγορία έχει: {category.items.length} προιόντα</p>
              <p className="italic text-xs">
                Κάντε κλικ για να επεξεργαστείτε τα προϊόντα αυτής της
                κατηγορίας
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mx-auto">
          Δεν έχετε προσθέσει κατηγορίες σε αυτόν τον κατάλογο!
        </p>
      )}
      <Link
        href={`/dash/${shop}/menus/${menu}/edit-categories`}
        className="mx-auto rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 flex flex-row gap-2 group"
      >
        <h1 className="font-medium">Επεξεργασία κατηγοριών</h1>
      </Link>
    </div>
  );
}
