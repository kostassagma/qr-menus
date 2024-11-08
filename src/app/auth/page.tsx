import MinimalNav from "@/components/navbar/minimal-nav";
import GoogleIcon from "@/icons/google";
import MailIcon from "@/icons/mail";
import { GOOGLE_CLIENT_ID, HOSTNAME } from "@/utils/constants";
import Link from "next/link";

const googleLink =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${HOSTNAME}/auth/google-redirect`,
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  }).toString();

export default function Home() {
  return (
    <>
      <main className="h-screen flex flex-col">
        <MinimalNav />
        <div className="p-4 flex w-full h-full">
          <div className="m-auto max-w-xs w-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
              <h1 className="text-xl font-semibold">Είσοδος στην υπηρεσία</h1>
              <a href={googleLink}>
                <button className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition ease-in-out flex flex-row gap-1">
                  <GoogleIcon height={16} className="my-auto" />
                  <span className="w-[1px] h-[24px] bg-white rounded" /> Είσοδος
                  με Google
                </button>
              </a>
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
          &copy;2024 Spider Menus. All rights reserved.
        </p>
      </main>
    </>
  );
}
