"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SetName from "./set-name";
import AddCategories from "./add-categories";
import SetLangs from "./set-langs";
import { MenuNameType, useNewMenuState } from "./new-menu-state";
import toast from "react-hot-toast";
import { createBrowserClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function NewMenuPage({ shop }: { shop: string }) {
  const { menu_name, categories, pathname, supported_languages } =
    useNewMenuState();

  async function createMenu() {
    if (!pathname || !menu_name || !categories || categories.length == 0) {
      toast.error("Συμπληρώστε όλα τα υποχρεωτικά πεδία");
      return;
    }

    const supabase = await createBrowserClient();

    const shopQuery = await supabase
      .from("shops")
      .select("supported_languages, id")
      .eq("pathname", shop)
      .limit(1);

    if (shopQuery.error || !shopQuery.data) {
      toast.error("Κάτι πήγε λάθος!");
      return;
    }

    let name: MenuNameType[] = [];

    try {
      name = supported_languages.map((lang) => {
        const shopName = menu_name.filter(({ locale }) => {
          return locale == lang;
        })[0];
        if (!shopName) {
          toast.error("Συμπληρώστε όλες τις διαλέκτους!");
          throw new Error("");
        }
        return shopName;
      });
    } catch (err) {
      return err;
    }

    const insertedMenu = await supabase
      .from("menus")
      .insert({
        pathname,
        shop: shopQuery.data[0].id,
      })
      .select("id");

    if (insertedMenu.error || !insertedMenu.data) return;

    await supabase.from("menu_names").insert(
      //@ts-expect-error because locale is str but supabase expects el|en
      menu_name.map((e) => ({
        locale: e.locale,
        text: e.text,
        menu: insertedMenu.data[0].id,
      }))
    );
    

    await supabase.from("menu_names").insert(
      //@ts-expect-error because locale is str but supabase expects el|en
      menu_name.map((e) => ({
        locale: e.locale,
        text: e.text,
        menu: insertedMenu.data[0].id,
      }))
    );

    redirect(`/dash/${shop}/menus`);

    // console.log(insertedMenu.data![0].id);
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashNav shop={shop} />
        <form
          action={async () => {
            await createMenu();
          }}
          className="p-4 max-w-5xl w-full mx-auto flex flex-col gap-5 py-10"
        >
          <h1 className="text-2xl mb-4 font-bold">Δημιουργία Νέου Καταλόγου</h1>
          <SetLangs shop={shop} />
          <SetName />
          <AddCategories />
          <div className="flex flex-col">
            <h1 className="text-xl">&#8594; Τέλος, υποβάλετε τον κατάλογο:</h1>
            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-[1.02] transition ease-in-out mt-auto mx-auto z-10"
            >
              Υποβολή του καταλόγου
            </button>
          </div>
        </form>
      </div>
      <BigFooter />
    </>
  );
}
