"use client";
import { FC } from "react";
import { useNewShopState } from "./new-shop-state";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import CloseIcon from "@/icons/close";

const SelectLanguages: FC = () => {
  const { supported_languages, pathname, addLang, removeLang } =
    useNewShopState();

  return (
    <div>
      <h1 className="text-xl">
        Αρχικά, επιλέξτε τις γλώσσες που θα περιλαμβάνει ο κατάλαγος:
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
                  supported_languages.includes(symbol)
                    ? removeLang(symbol)
                    : addLang(symbol);
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
      <p>
        Με τις τρέχουσες επιλογές, ο καταλογός σας είναι διαθέσιμος στις εξής
        γλώσσες:{" "}
        {supported_languages
          .map((symbol) => {
            for (let i = 0; i < SUPPORTED_LANGUAGES.length; i++) {
              if (SUPPORTED_LANGUAGES[i].symbol == symbol)
                return SUPPORTED_LANGUAGES[i].label;
            }
          })
          .join(", ")}
      </p>
    </div>
  );
};

export default SelectLanguages;
