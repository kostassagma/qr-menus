import { createServerClient } from "@/utils/supabase/server";
import EditAvailability from "./edit-availability";

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
      menus (
        menu_names (
          locale,
          text
        ),
        pathname,
        categories (
          category_name (
            locale, text
          ),
          items (
            items_name (
              locale, text
            ),
            available,
            id,
            item_order
          )
        )
      )
    `
    )
    .eq("pathname", shop)
    .limit(1);

  return (
    <div className="bg-neutral-100 p-5 rounded-2xl">
      {shopQuery.data![0].menus.map((e, i) => (
        <div key={i}>
          <h3 className="font-semibold text-xl">
            &#8594; {e.menu_names.map((e) => e.text).join("/")}
          </h3>
          <div className="pl-2">
            {e.categories.map((e, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg">
                  &#8658; {e.category_name.map((e) => e.text).join("/")}
                </h3>
                <div className="gap-2 flex flex-col">
                  {e.items.sort((a, b)=>(a.item_order-b.item_order)).map((e, i) => (
                    <div
                      key={i}
                      className="w-full p-2 border border-gray-300 rounded-md  hover:cursor-pointer transition ease-in-out hover:border-gray-500 flex flex-row"
                    >
                      <p className="mr-auto three-dots">
                        {e.items_name.map((e) => e.text).join("/")}
                      </p>
                      <EditAvailability
                        initialValue={e.available}
                        itemId={e.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
