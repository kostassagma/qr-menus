import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createSuperClient } from "@/utils/supabase/superuser";
import { redirect } from "next/navigation";
import CategoriesSelector from "./categories-selector";
import Link from "next/link";
import BackIcon from "@/icons/back";
import SwitchLang from "./switch-lang";
import SwitchLangsButton from "./switch-langs-button";

export const revalidate = 180; // seconds

export default async function ShopPage({
  params,
}: {
  params: Promise<{ menu: string; lang: string }>;
}) {
  const _ = await params;
  const menuPathname = _.menu;
  const lang = _.lang;

  const supabase = await createSuperClient();
  const menuQuery = await supabase
    .from("menus")
    .select(
      `
      pathname,
      shop:shops!inner (
        pathname,
        supported_languages,
        icon,
        shop_image
      ),
      menu_names (
        locale,
        text
      ),
      categories (
        category_order,
        category_name (
          text,
          locale
        ),
        items (
          item_order,
          available,
          price,
          items_name (
            text,
            locale
          )
        )
      )
    `
    )
    .eq("pathname", menuPathname)
    .limit(1);

  if (menuQuery.error || !menuQuery.data) return redirect("/");

  const menuData = menuQuery.data[0];

  //@ts-expect-error supported_langs is any!
  if (!menuData.shop.supported_languages.includes(lang))
    return redirect(
      //@ts-expect-error supported_langs is any!
      `/m/${menuPathname}/${menuData.shop.supported_languages[0]}`
    );

  return (
    <>
      <div className="min-h-screen max-w-4xl mx-auto">
        <div className={`w-full ${menuData.shop.shop_image?"aspect-video":"h-24 bg-neutral-50"} sticky top-0`}>
          <Link
            href={`/s/${menuData.shop.pathname}/${lang}`}
            className="absolute top-3 left-3 p-3 bg-gray-800 text-white rounded-full"
          >
            <BackIcon width={15} />
          </Link>
          <SwitchLangsButton />
          {menuData.shop.shop_image && (
            <img
              src={`https://cdn.digitalmenus.gr/images/${menuData.shop.shop_image}.png`}
            />
          )}
        </div>
        <div className="w-full bg-neutral-50 rounded-t-3xl h-full -translate-y-6 scroll-smooth">
          <div className="flex flex-row gap-2 px-7 py-10">
            <h1 className="text-2xl font-bold my-auto">
              {menuData.menu_names.find((e) => e.locale == lang)!.text}
            </h1>
            <img
              alt="Icon"
              src={"https://cdn.e-food.gr/shop/6854252/logo?t=1701704968"}
              className="ml-auto aspect-square w-12 rounded-full"
            />
          </div>
          <CategoriesSelector
            categories={menuData.categories
              .sort((a, b) => a.category_order - b.category_order)
              .map((e) => ({
                label: e.category_name.find((e) => e.locale === lang)!.text,
                order: e.category_order,
              }))}
          />
          <div className="min-h-screen flex flex-col gap-4 py-5 px-3">
            {menuData.categories
              .sort((a, b) => a.category_order - b.category_order)
              .map((e) => (
                <div key={e.category_order}>
                  <div
                    id={e.category_order.toString()}
                    className="-translate-y-11"
                  />
                  <h2 className="text-xl font-semibold border-b-2 border-gray-400">
                    {e.category_name.find((e) => e.locale === lang)!.text}
                  </h2>
                  <div className="flex flex-col gap-4 my-4">
                    {e.items
                      .sort((a, b) => {
                        if (a.available && !b.available) {
                          return -1;
                        } else if (!a.available && b.available) {
                          return 1;
                        } else {
                          return a.item_order - b.item_order;
                        }
                      })
                      .map((e) => (
                        <div
                          key={e.item_order}
                          className="flex flex-row gap-5 border-b border-gray-200 py-3"
                        >
                          <div className="flex-1">
                            {!e.available && (
                              <p className="text-gray-500 italic font-light">
                                Μη διαθέσιμο
                              </p>
                            )}
                            <h3
                              className={`font-semibold ${
                                e.available ? "text-black" : "text-gray-500"
                              }`}
                            >
                              {e.items_name.find((e) => e.locale == lang)!.text}
                            </h3>
                            <p
                              className={`mt-1 ${
                                e.available ? "text-gray-500" : "text-gray-500"
                              }`}
                            >
                              Με πορτοκάλι, αχλάδι, μήλο & μπανάνα
                            </p>
                            <p
                              className={`${
                                e.available ? "text-black" : "text-gray-500"
                              }`}
                            >
                              {e.price}€
                            </p>
                          </div>
                          <img
                            className={`rounded-md overflow-hidden h-20 ${
                              !e.available && "grayscale opacity-80"
                            }`}
                            src="https://cdn.e-food.gr/cdn-cgi/image/h=160,fit=cover,q=100,f=auto/restaurants/834194/offer/1043293"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            <div className="h-screen" />
          </div>
        </div>
      </div>
      <SwitchLang
        current={lang}
        pathname={menuPathname}
        /* @ts-expect-error i have f*d up types */
        supported_languages={menuData.shop.supported_languages}
      />
    </>
  );
}

export async function generateStaticParams() {
  const supabase = await createSuperClient();

  const shops = await supabase.from("menus").select("pathname");

  return SUPPORTED_LANGUAGES.map((lang) =>
    shops.data!.map((e) => ({
      menu: e.pathname,
      lang: lang.symbol,
    }))
  ).flat();
}
