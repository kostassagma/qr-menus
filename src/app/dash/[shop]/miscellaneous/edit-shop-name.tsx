"use client";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { FC, useState } from "react";

interface Props {
  shop_names: {
    locale: string;
    text: string;
  }[];
}

const EditShopName: FC<Props> = ({ shop_names }) => {
  const [name, setName] = useState(shop_names);

  return (
    <div className="flex flex-col gap-2 my-auto">
      <h3 className="font-semibold text-xl">
        Επεξεργαστείτε το όνομα του μαγαζιού:
      </h3>
      {shop_names.map(({ locale, text }) => (
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
                  locale: e.locale,
                  text: locale === e.locale ? ev.target.value : e.text,
                }))
              );
            }}
          />
        </div>
      ))}
      <div className="flex flex-row gap-2">
        <button className="rounded-md border border-gray-500 w-full p-2 hover:scale-105 transition ease-in-out">
          Άκυρο
        </button>
        <button className="rounded-md border border-gray-500 w-full p-2 hover:scale-105 transition ease-in-out">
          Αποθήκευση
        </button>
      </div>
    </div>
  );
};

export default EditShopName;
