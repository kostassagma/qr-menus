import Link from "next/link";
import { createServerClient } from "@/utils/supabase/server";
import { permanentRedirect } from "next/navigation";
import LinkIcon from "@/icons/link";
import QrCodeSnippet from "@/components/qr-code-snippet";
import EditMenuName from "./edit-menu-name";

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
          category_order,
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
      <Link
        href={`/m/${menu}`}
        target="_blank"
        className="group flex flex-row gap-3"
      >
        <h1 className="text-2xl font-bold">
          {menuData.menu_names.map((e) => e.text).join("/")}
        </h1>
        <LinkIcon
          width={20}
          className="my-auto invisible group-hover:visible"
        />
      </Link>
      <div className="bg-slate-300 rounded-3xl p-5 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Οι κατηγορίες του καταλόγου:</h3>
        {menuData.categories.length != 0 ? (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            {menuData.categories.map((category, i) => (
              <Link
                href={`/dash/${shop}/menus/${menu}/${category.category_order}`}
                key={i}
                className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 flex flex-col gap-1 w-full"
              >
                <h2 className="text-xl font-semibold three-dots">
                  {category.category_name.map((e) => e.text).join("/")}
                </h2>
                <p className="text-gray-800">Αυτή η κατηγορία έχει: {category.items.length} προιόντα</p>
                <p className="italic text-xs text-gray-600">
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
      <div className="flex flex-col md:flex-row gap-3">
        <div className="bg-slate-300 rounded-3xl p-5 flex-1 flex flex-col">
          <EditMenuName menu_names={menuData.menu_names} />
        </div>
        <div className="bg-slate-300 rounded-3xl p-5 flex-1">
          <QrCodeSnippet link={`/m/${menu}`} />
        </div>
      </div>
    </div>
  );
}
