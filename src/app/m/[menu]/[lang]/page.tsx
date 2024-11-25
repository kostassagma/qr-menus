import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createSuperClient } from "@/utils/supabase/superuser";
import { redirect } from "next/navigation";
import CategoriesSelector from "./categories-selector";
import Link from "next/link";
import BackIcon from "@/icons/back";
import SwitchLang from "./switch-lang";
import SwitchLangsButton from "./switch-langs-button";

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
      shop (
        supported_languages
      ),
      menu_names (
        locale,
        text
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
        <div className="w-full aspect-video sticky top-0">
          <Link
            href={"/dash"}
            className="absolute top-3 left-3 p-3 bg-gray-800 text-white rounded-full"
          >
            <BackIcon width={15} />
          </Link>
          <SwitchLangsButton />
          <img src="https://cdn.e-food.gr/cdn-cgi/image/f=auto/shop/6854252/cover?t=1707728012" />
        </div>
        <div className="w-full bg-neutral-50 rounded-t-3xl h-full -translate-y-6 scroll-smooth">
          <div className="flex flex-row gap-2 p-10">
            <h1 className="text-2xl font-bold my-auto">
              {menuData.menu_names.find((e) => e.locale == lang)!.text}
            </h1>
            <img
              alt="Icon"
              src={"https://cdn.e-food.gr/shop/6854252/logo?t=1701704968"}
              className="ml-auto aspect-square w-12 rounded-full"
            />
          </div>
          <CategoriesSelector categories={cats} />
          <div className="min-h-screen flex flex-col gap-4 py-5 px-3">
            {cats.map((e) => (
              <div key={e.order}>
                <h2 className="text-xl font-semibold border-b-2 border-gray-400">
                  {e.label}
                </h2>
                <div className="flex flex-col gap-4 my-4">
                  {cats.map((e) => (
                    <div
                      key={e.order}
                      className="flex flex-row gap-5 border-b border-gray-200 py-3"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          Φυσικός Χυμός Πορτοκάλι
                        </h3>
                        <p className="text-gray-500">
                          Με πορτοκάλι, αχλάδι, μήλο & μπανάνα
                        </p>
                        <p>3,20€</p>
                      </div>
                      <img
                        className="rounded-md overflow-hidden h-20"
                        src="https://cdn.e-food.gr/cdn-cgi/image/h=160,fit=cover,q=100,f=auto/restaurants/834194/offer/1043293"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

const cats = [
  {
    label: "Απλές1 Γεύσεις",
    order: 0,
  },
  {
    label: "Απλές2 Γεύσεις",
    order: 1,
  },
  {
    label: "Απλές3 Γεύσεις",
    order: 2,
  },
  {
    label: "Απλές4 Γεύσεις",
    order: 3,
  },
  {
    label: "Απλές5 Γεύσεις",
    order: 4,
  },
  {
    label: "Απλές6 Γεύσεις",
    order: 5,
  },
  {
    label: "Απλές7 Γεύσεις",
    order: 6,
  },
];
