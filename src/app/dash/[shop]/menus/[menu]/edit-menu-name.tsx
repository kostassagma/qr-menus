"use client";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { createBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  menu_names: {
    id: number;
    locale: string;
    text: string;
  }[];
}

const EditMenuName: FC<Props> = ({ menu_names }) => {
  const [name, setName] = useState(menu_names);
  const router = useRouter();

  async function editMenuName() {
    const supabase = await createBrowserClient();
    await name.forEach(async (e) => {
      await supabase.from("menu_names").update({ text: e.text }).eq("id", e.id);
    });
    toast.success("Το όνομα του καταλόγου άλλαξε επιτυχώς!");
    router.refresh();
  }

  return (
    <form action={editMenuName} className="flex flex-col gap-2 h-full">
      <h3 className="font-semibold text-xl">
        Επεξεργαστείτε το όνομα του καταλόγου:
      </h3>
      {menu_names.map(({ locale }) => (
        <div key={locale}>
          <label>
            {(() => {
              for (let i = 0; i < SUPPORTED_LANGUAGES.length; i++) {
                if (SUPPORTED_LANGUAGES[i].symbol == locale)
                  return SUPPORTED_LANGUAGES[i].label;
              }
            })()}
            :
          </label>
          <input
            value={name.filter((e) => e.locale == locale)[0].text}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="link"
            type="text"
            name={`name-${locale}`}
            placeholder={locale}
            lang={locale}
            required={true}
            onSubmit={(e) => e.preventDefault()}
            onChange={(ev) => {
              ev.preventDefault();
              setName((old) =>
                old.map((e) => ({
                  id: e.id,
                  locale: e.locale,
                  text: locale === e.locale ? ev.target.value : e.text,
                }))
              );
            }}
          />
        </div>
      ))}
      <div className="flex flex-row gap-3 mt-auto">
        <button className="rounded-md border bg-accent text-white w-full p-2 hover:scale-105 transition ease-in-out">
          Άκυρο
        </button>
        <button className="rounded-md border bg-accent text-white w-full p-2 hover:scale-105 transition ease-in-out">
          Αποθήκευση
        </button>
      </div>
    </form>
  );
};

export default EditMenuName;
