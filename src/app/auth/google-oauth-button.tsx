"use client";

import GoogleIcon from "@/icons/google";
import { createBrowserClient } from "@/utils/supabase/client";
import { FC } from "react";

const GoogleOAuthButton: FC = () => {
  return (
    <button
      onClick={async () => {
        const supabase = await createBrowserClient();
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `http://localhost:3000/auth/callback`,
          },
        });
      }}
      className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out flex flex-row gap-1"
    >
      <GoogleIcon height={16} className="my-auto" />
      <span className="w-[1px] h-[24px] bg-white rounded" /> Είσοδος με Google
    </button>
  );
};

export default GoogleOAuthButton;
