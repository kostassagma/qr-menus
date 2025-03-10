import FacebookIcon from "@/icons/facebook";
import InstagramIcon from "@/icons/instagram";
import LangsIcon from "@/icons/langs";
import MapsIcon from "@/icons/maps";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createSuperClient } from "@/utils/supabase/superuser";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 180; // seconds

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string; lang: string }>;
}) {
  const _ = await params;
  const shopPathname = _.shop;
  const lang = _.lang;

  const supabase = await createSuperClient();
  const shopQuery = await supabase
    .from("shops")
    .select(
      `
      pathname,
      icon,
      shop_image,
      supported_languages,
      shop_names (
        locale,
        text
      ),
      menus (
        pathname,
        menu_names (
          locale,
          text
        )
      )
    `
    )
    .eq("pathname", shopPathname)
    .limit(1);

  if (shopQuery.error || !shopQuery.data) return redirect("/");

  const shopData = shopQuery.data[0];

  //@ts-expect-error supported_langs is any!
  if (!shopData.supported_languages.includes(lang))
    //@ts-expect-error supported_langs is any!
    return redirect(`/s/${shopPathname}/${shopData.supported_languages[0]}`);

  return (
    <div
      className="flex p-4 min-h-screen bg-neutral-200"
      style={{
        backgroundImage: shopData.shop_image
          ? `url("https://cdn.digitalmenus.gr/images/${shopData.shop_image}.png")`
          : "",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="m-auto shadow-2xl rounded-lg p-10 w-full bg-neutral-50 flex flex-col gap-5 max-w-4xl">
        <div className="flex flex-row gap-2">
          <h1 className="text-2xl font-bold my-auto">
            {shopData.shop_names.find((e) => e.locale == lang)!.text}
          </h1>
          {shopData.icon && (
            <img
              alt="Icon"
              src={`https://cdn.digitalmenus.gr/images/${shopData.icon}.png`}
              className="ml-auto aspect-square w-12 rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Οι καταλογοι του μαγαζιού:</h3>
          {shopData.menus.map((e) => (
            <Link
              key={e.pathname}
              href={`/m/${e.pathname}/${lang}`}
              className="border border-gray-500 rounded-md p-2"
            >
              {e.menu_names.find((e) => e.locale == lang)!.text}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          <LangsIcon className="w-5 mx-auto" />
          {/* @ts-expect-error i have f*d up types  */}
          {shopData.supported_languages.map((currentLang) => (
            <Link
              key={currentLang}
              href={`/s/${shopPathname}/${currentLang}`}
              className={`mx-auto ${
                lang == currentLang ? "bg-gray-200" : "bg-transparent"
              } px-3 rounded-lg`}
            >
              {SUPPORTED_LANGUAGES.find((e) => e.symbol == currentLang)!.label}
            </Link>
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-row text-sm gap-2 m-auto">
            <Link href={""} target="_blank">
              <MapsIcon className="w-5" />
            </Link>
            <Link href={""} target="_blank">
              <InstagramIcon className="w-5" />
            </Link>
            <Link href={""} target="_blank">
              <FacebookIcon className="w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = await createSuperClient();

  const shops = await supabase.from("shops").select("pathname");

  return SUPPORTED_LANGUAGES.map((lang) =>
    shops.data!.map((e) => ({
      shop: e.pathname,
      lang: lang.symbol,
    }))
  ).flat();
}
