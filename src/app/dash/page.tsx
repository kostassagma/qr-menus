import BigFooter from "@/components/footer/big-footer";
import HomeNav from "@/components/navbar/home-nav";
import WebIcon from "@/icons/web";
import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) return <></>;

  return (
    <>
      <HomeNav />
      <main>
        <div className="h-[80vh] flex p-4">
          <div className="m-auto max-w-lg">
            <h1 className="text-2xl font-semibold">{data.user.email}</h1>
            <p className="mb-3">
              Κατακτήστε τον παγκόσμιο δημιουργώντας το μενού σας με λίγα μόνο
              κλικ
            </p>
            <div className="flex">
              <a href="/auth">
                <button className="bg-accent hover:scale-105 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded transition ease-in-out relative group overflow-hidden flex">
                  <WebIcon
                    className="group-hover:translate-y-5 group-hover:translate-x-5 -top-10 -left-10 absolute transition ease-in-out"
                    width={40}
                  />
                  <WebIcon
                    className="group-hover:-translate-y-5 group-hover:-translate-x-5 -bottom-10 -right-10 absolute transition ease-in-out"
                    width={40}
                  />
                  Φτιάξε Μενού
                </button>
              </a>
              <div className="flex-1" />
              <Link href="/features">
                <p className="my-auto cursor-pointer transition duration-300 group text-accent hover:scale-105">
                  Μάθε περισσότερα
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-[0.5px] bg-black -translate-y-[5px]"></span>
                </p>
              </Link>
              {/* <a className="my-auto hover:underline" href="/features">Μάθε περισσότερα</a> */}
            </div>
          </div>
        </div>
      </main>
      <BigFooter />
    </>
  );
}
