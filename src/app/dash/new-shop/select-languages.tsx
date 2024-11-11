"use client";
import { FC } from "react";
import { useNewShopState } from "./new-shop-state";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import CloseIcon from "@/icons/close";

const SelectLanguages: FC = () => {
  const { supported_languages, addLang, removeLang } = useNewShopState();

  return (
    <div>
      <h1 className="text-xl">
        &#8594; Αρχικά, επιλέξτε τις γλώσσες που θα περιλαμβάνει ο κατάλαγος:
      </h1>
      <div className="block">
        {SUPPORTED_LANGUAGES.map(({ symbol, label }) => (
          <div className="inline-block" key={symbol}>
            <div className="flex flex-row m-2">
              <div
                className={`${
                  supported_languages.includes(symbol)
                    ? "bg-gray-500 text-white"
                    : "bg-white text-black"
                } py-1 px-3 rounded-l-lg transition ease-in-out`}
              >
                {symbol}-{label}
              </div>
              <button
                className={`${
                  supported_languages.includes(symbol)
                    ? "rounded-r-lg"
                    : " rounded-lg"
                } bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 transition ease-in-out`}
                onClick={(e) => {
                  e.preventDefault();
                  if (supported_languages.includes(symbol)) {
                    removeLang(symbol);
                  } else {
                    addLang(symbol);
                  }
                }}
              >
                <CloseIcon
                  width={15}
                  className={`my-auto ${
                    supported_languages.includes(symbol)
                      ? "rotate-0"
                      : "rotate-45"
                  } transition ease-in-out`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLanguages;
