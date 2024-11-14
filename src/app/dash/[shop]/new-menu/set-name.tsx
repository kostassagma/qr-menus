"use client";
import { FC } from "react";
import { useNewMenuState } from "./new-menu-state";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";

const SetName: FC = () => {
  const { menu_name, editName } = useNewMenuState();

  return (
    <div>
      <h1 className="text-xl">
        &#8594; Αρχικά, εισάγετε τον τίτλο του καταλόγου
      </h1>
      <div className="flex flex-col gap-2">
        {["el", "en"].map((symbol) => (
          <div key={symbol}>
            <label>
              {(() => {
                for (let i = 0; i < SUPPORTED_LANGUAGES.length; i++) {
                  if (SUPPORTED_LANGUAGES[i].symbol == symbol)
                    return SUPPORTED_LANGUAGES[i].label;
                }
              })()}
              :
            </label>
            <input
              value={menu_name.filter((e) => e.locale == symbol)[0].text}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="link"
              type="text"
              name={`name-${symbol}`}
              placeholder={symbol}
              lang={symbol}
              required={true}
              onSubmit={(e) => e.preventDefault()}
              onChange={(e) => {
                e.preventDefault();
                editName(symbol, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetName;
