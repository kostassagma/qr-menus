"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SelectLanguages from "./select-languages";
import SetName from "./set-name";
import UploadImages from "./upload-image";
import { useNewShopState } from "./new-shop-state";
import { createShop } from "./actions";
import { useState } from "react";

export default function Dash() {
  const { pathname } = useNewShopState();
  const [uploading, setUploading] = useState(false);
  console.log(uploading);

  return (
    <>
      <div className="min-h-screen">
        <DashNav />
        <form
          action={async (e) => {
            await createShop(e);
          }}
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
          <button
            type="submit"
            className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out m-auto"
          >
            Δημιουργία Μαγαζιού
          </button>
        </form>
      </div>
      <BigFooter />
      {uploading && (
        <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-xl z-50"></div>
      )}
    </>
  );
}
