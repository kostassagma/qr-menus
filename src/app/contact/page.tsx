"use client";
import HomeNav from "@/components/navbar/home-nav";
import BigFooter from "@/components/footer/big-footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PhoneIcon from "@/icons/phone";
import MailIcon from "@/icons/mail";

export default function Contact() {
  const searchParams = useSearchParams();
  const subjectFromParams = searchParams.get("subject");

  return (
    <Suspense>
      <div className="min-h-screen flex flex-col">
        <HomeNav />
        <main className="flex-1 w-full p-10 flex">
          <div className="m-auto w-full flex flex-col gap-2">
            <form
              className="p-10 bg-gray-200 rounded-lg overflow-hidden max-w-5xl gap-3 flex flex-col w-full"
              autoComplete="on"
            >
              <h1 className="text-2xl font-bold">Επικοινωνία</h1>
              <div>
                <label>Ονοματεπώνυμο:</label>
                <input
                  className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                  id="fname"
                  type="text"
                  name="fname"
                  placeholder="Κωνσταντίνος Σαγματόπουλος"
                  required={true}
                  autoComplete="name"
                />
              </div>
              <div>
                <label>Email επικοινωνίας:</label>
                <input
                  className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required={true}
                />
              </div>
              <div>
                <label>Όνομα μαγαζιού</label>
                <input
                  className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                  id="shop-name"
                  type="text"
                  name="shop-name"
                  placeholder="McDonalds Αγία Παρασκευή"
                  required={true}
                />
              </div>
              <div>
                <label>Θέμα</label>
                <input
                  className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Θέμα"
                  required={true}
                  defaultValue={(() => {
                    switch (subjectFromParams) {
                      case "photo":
                        // code block
                        return "Φωτογράφιση";
                      case "request-custom":
                        return "Προσωποποιημένο μενού";
                      default:
                        return "";
                      // code block
                    }
                  })()}
                />
              </div>
              <div>
                <label>Λεπτομέρειες</label>
                <textarea
                  name="details"
                  className={`shadow rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1`}
                />
              </div>
              <button
                className="bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-[1.01] transition ease-in-out w-full"
                type="submit"
              >
                Αποστολή
              </button>
            </form>
            <div className="flex flex-col w-full items-center">
              <p className="inline-block mr-2">Εναλλακτικά: </p>
              <div className="flex flex-row">
                <PhoneIcon height={15} className="my-auto" />
                <p>: 6970460507</p>
              </div>
              <div
                className="flex flex-row"
              >
                <MailIcon height={15} className="my-auto" />
                <p>: kostassagmatopoulos@gmail.com</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BigFooter />
    </Suspense>
  );
}
