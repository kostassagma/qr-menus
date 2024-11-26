import QrCodeSnippet from "@/components/qr-code-snippet";
import LinkIcon from "@/icons/link";
import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";
import EditShopName from "./edit-shop-name";
import ThreeDotsIcon from "@/icons/three-dots";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  const supabase = await createServerClient();

  const shopQuery = await supabase
    .from("shops")
    .select(
      `
      supported_languages,
      shop_names (
        locale,
        text
      ),
      menus (
        menu_names (
          locale,
          text
        ),
        pathname,
        categories (
          category_name (
            locale, text
          )
        )
      )
    `
    )
    .eq("pathname", shop)
    .limit(1);

  if (!shopQuery.data || shopQuery.error) return <></>;

  const shopData = shopQuery.data[0];

  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/s/${shop}`}
        target="_blank"
        className="group flex flex-row gap-3"
      >
        <h1 className="text-2xl font-bold">
          {shopData.shop_names.map((e) => e.text).join("/")}
        </h1>
        <LinkIcon
          width={20}
          className="my-auto invisible group-hover:visible"
        />
      </Link>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1 flex flex-col">
          <EditShopName shop_names={shopData.shop_names} />
        </div>
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1">
          <QrCodeSnippet link={`/s/${shop}`} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Οι κατάλογοι του μαγαζιού:</h2>
          <div className="grid grid-cols-2 gap-5 w-full">
            {shopData.menus.slice(0, 3).map((menu, i) => (
              <Link
                href={`/dash/${shop}/menus/${menu.pathname}`}
                key={i}
                className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 w-full h-full"
              >
                <h2 className="text-xl font-semibold three-dots">
                  {menu.menu_names.map((e) => e.text).join("/")}
                </h2>
                <p className="text-gray-800">
                  Αυτός ο κατάλογος έχει: {menu.categories.length} κατηγορίες
                </p>
                <p className="italic text-xs text-gray-600">
                  Κάντε κλικ για να επεξεργαστείτε τις κατηγορίες και τα
                  αντίστοιχα προϊόντα τους.
                </p>
              </Link>
            ))}
            <Link
              href={`/dash/${shop}/menus/`}
              className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 w-full h-full flex group"
            >
              <ThreeDotsIcon className="m-auto w-10 text-gray-500 group-hover:text-black transition-colors ease-in-out" />
            </Link>
          </div>
        </div>
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1">
          <QrCodeSnippet link={`/s/${shop}`} />
        </div>
      </div>
    </div>
  );
}
