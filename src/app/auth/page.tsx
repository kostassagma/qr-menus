"use server";
import MinimalNav from "@/components/navbar/minimal-nav";
import MailIcon from "@/icons/mail";
import Link from "next/link";
import GoogleOAuthButton from "./google-oauth-button";

export default async function Auth() {
  return (
    <>
      <main className="h-screen flex flex-col">
        <MinimalNav />
        <div className="p-4 flex w-full h-full">
          <div className="m-auto max-w-xs w-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
              <h1 className="text-xl font-semibold">Είσοδος στην υπηρεσία</h1>
              <GoogleOAuthButton />
              <p className="flex flex-row gap-1 text-gray-500">
                <span className="w-full h-[0.5px] bg-gray-400 my-auto" />
                ή
                <span className="w-full h-[0.5px] bg-gray-400 my-auto" />
              </p>
              <Link href={"/auth/email"}>
                <button className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out flex flex-row gap-1">
                  <MailIcon height={16} className="my-auto" />
                  <span className="w-[1px] h-[24px] bg-white rounded" /> Είσοδος
                  με Email
                </button>
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Qr Menus. All rights reserved.
        </p>
      </main>
    </>
  );
}
