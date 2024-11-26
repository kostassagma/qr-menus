import BigFooter from "@/components/footer/big-footer";
import HomeNav from "@/components/navbar/home-nav";
import WebIcon from "@/icons/web";
import Link from "next/link";
import Image from "next/image";

import SvgBanner from "../../public/svg-banner.svg";

export default function Home() {
  return (
    <>
      <HomeNav />
      <main>
        <div className="h-[80vh] sm:h-[35rem] flex py-28 px-10 sm:p-10 overflow-hidden">
          <div className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-16 h-full">
            <div className="my-auto">
              <h1 className="text-2xl font-semibold">
                Ψηφιακά μενού με QR με λίγα κλικ
              </h1>
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
            <Image
              src={SvgBanner}
              alt="svg banner"
              className="sm:h-96 my-auto sm:w-min w-full"
            />
          </div>
        </div>
        <div className="h-screen max-w-2xl mx-auto bg-neutral-100 rounded-3xl p-10"> Blah Bllah</div>
      </main>
      <BigFooter />
    </>
  );
}
