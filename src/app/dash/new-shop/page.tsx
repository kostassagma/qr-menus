"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SelectLanguages from "./select-languages";
import SetName from "./set-name";
import UploadImages from "./upload-image";
import { useNewShopState } from "./new-shop-state";
import toast from "react-hot-toast";
import { createShop } from "./actions";
import { useActionState, useEffect } from "react";

export default function NewShop() {
  const [error, formAction] = useActionState(createShop, { message: "" });
  const { pathname, supported_languages } = useNewShopState();

  useEffect(() => {
    if (error.message) toast.error(error.message);
  }, [error]);

  return (
    <>
      <div className="min-h-screen">
        <DashNav />
        <form
          action={formAction}
          className="p-4 max-w-5xl w-full mx-auto flex flex-col gap-5 py-10"
        >
          <h1 className="text-2xl mb-4 font-bold">Δημιουργία Μαγαζιού</h1>
          <SelectLanguages />
          <SetName />
          <UploadImages />
          <input
            required={true}
            value={pathname}
            hidden
            name="pathname"
            readOnly
          />
          <input
            required={true}
            value={JSON.stringify(supported_languages)}
            hidden
            name="supported_languages"
            readOnly
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out m-auto"
          >
            Δημιουργία Μαγαζιού
          </button>
        </form>
      </div>
      <BigFooter />
    </>
  );
}
