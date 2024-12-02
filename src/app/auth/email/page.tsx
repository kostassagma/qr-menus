"use client";
import MinimalNav from "@/components/navbar/minimal-nav";
import CheckIcon from "@/icons/check";
import { HOSTNAME } from "@/utils/constants";
import { createBrowserClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  return (
    <>
      <main className="h-screen flex flex-col">
        <MinimalNav />
        <div className="p-4 flex w-full h-full">
          <div className="m-auto max-w-md w-full">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2 transition-all ease-in-out"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!validEmail) {
                  return toast("Παρακαλώ εισάγετε ένα έγκυρο email");
                }
                const supabase = await createBrowserClient();
                const { error } = await supabase.auth.signInWithOtp({
                  email: email,
                  options: {
                    // set this to false if you do not want the user to be automatically signed up
                    shouldCreateUser: true,
                    emailRedirectTo: `${HOSTNAME}/auth/email/confirm`
                  },
                });
                if (error) {
                  toast.error("Κάτι πήγε λάθος!")
                } else {
                  redirect("/auth/email/check-email")
                }
              }}
            >
              <h1 className="text-xl font-semibold">
                Εισάγετε το email σας παρακάτω:
              </h1>
              <div
                className={`flex flex-row border rounded transition-all ease-in-out overflow-hidden ${
                  validEmail ? "" : "border-red-500"
                }`}
              >
                <input
                  value={email}
                  className={`shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className={`${
                    validEmail
                      ? "bg-green-500"
                      : "bg-red-500 cursor-not-allowed"
                  } p-2 transition-all ease-in-out`}
                >
                  <CheckIcon width={16} color="white" />
                </button>
              </div>
              <input type="submit" hidden />
              <Link
                href="/auth"
                className="my-auto cursor-pointer text-red-500 font-light hover:underline mr-auto"
              >
                ← Πίσω
              </Link>
            </form>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Qr Menus. All rights reserved.
        </p>
      </main>
    </>
  );
}
