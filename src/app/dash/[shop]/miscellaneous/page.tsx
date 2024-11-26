import QrCodeSnippet from "@/components/qr-code-snippet";
import LinkIcon from "@/icons/link";
import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";
import EditShopName from "./edit-shop-name";

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
    <div>
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
      <div className="flex flex-col md:flex-row gap-3">
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1 flex flex-col">
          <EditShopName shop_names={shopData.shop_names} />
        </div>
        <div className="bg-neutral-100 rounded-3xl p-5 flex-1">
          <QrCodeSnippet link={`/s/${shop}`} />
        </div>
      </div>
    </div>
  );
}
