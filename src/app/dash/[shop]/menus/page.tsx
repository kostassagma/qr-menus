import Link from "next/link";
import PlusIcon from "@/icons/plus";
import { createServerClient } from "@/utils/supabase/server";

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

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Οι κατάλογοι του μαγαζιού:</h1>
      <div className="flex-1 flex flex-col gap-3 w-full bg-slate-300 p-5 rounded-3xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {shopQuery.data![0].menus.map((menu, i) => (
            <Link
              href={`/dash/${shop}/menus/${menu.pathname}`}
              key={i}
              className="rounded-lg p-5 border border-gray-500 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-700 w-full"
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
        </div>
        <Link
          href={`/dash/${shop}/new-menu`}
          className="mx-auto rounded-lg p-2 border bg-accent text-white hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 flex flex-row gap-2 group"
        >
          <PlusIcon
            width={20}
            className="group-hover:rotate-180 transition ease-in-out duration-300"
          />
          <p className="font-medium">Νέος κατάλογος</p>
        </Link>
      </div>
      <p className="italic font-light mx-auto text-center">
        Εδώ μπορείτε να κάνετε μόνιμες αλλαγές στους καταλόγους, όπως να
        προσθέσετε προϊόντα μόνιμα ή να τα αφαιρέσετε, να αλλάξετε την τιμή
        τους, κλπ...
      </p>
      <p className="italic font-medium mx-auto">
        Αν θέλετε απλά να ανανεώσετε την διαθεσιμότητα ενός προϊόντος, πατήστε{" "}
        <Link href={`/dash/${shop}/items`} className="underline text-accent">
          εδω
        </Link>
      </p>
    </div>
  );
}
