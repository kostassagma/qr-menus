import BigFooter from "@/components/footer/big-footer";
import HomeNav from "@/components/navbar/home-nav";
import WebIcon from "@/icons/web";
import Link from "next/link";
import Image from "next/image";
import SvgBanner from "../../public/svg-banner.svg";
import ArrowIcon from "@/icons/arrow";
import { FC } from "react";
import ContactForm from "./contact/contact-form";

export default function Home() {
  return (
    <>
      <HomeNav />
      <main>
        <div className="bg-slate-100 absolute w-full h-[calc(100vh)] top-0 left-0 -z-40"></div>
        <div className="h-[80vh] flex py-28 px-10 sm:p-10 overflow-hidden">
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
                <Link
                  href="/auth"
                  className="bg-accent hover:scale-105 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded transition ease-in-out relative group overflow-hidden flex"
                >
                  <WebIcon
                    className="group-hover:translate-y-5 group-hover:translate-x-5 -top-10 -left-10 absolute transition ease-in-out"
                    width={40}
                  />
                  <WebIcon
                    className="group-hover:-translate-y-5 group-hover:-translate-x-5 -bottom-10 -right-10 absolute transition ease-in-out"
                    width={40}
                  />
                  Φτιάξε Μενού
                </Link>
                <div className="flex-1" />
                <Link href="/pricing">
                  <p className="my-auto cursor-pointer transition duration-300 group text-accent hover:scale-105">
                    Τιμολόγηση
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
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-10 flex flex-col">
          <h3 className="text-2xl font-semibold mx-auto mb-2">
            Γιατί η πλατφόρμα μας ξεχωρίζει από τον διαγωνισμό:
          </h3>
          <div className="w-full flex flex-col md:flex-row gap-2">
            <div className="flex-1 border border-slate-300 rounded-md p-5 flex flex-col">
              <h3 className="text-lg font-semibold">Κορυφαία Ταχύτητα</h3>
              <p className="text-gray-600">
                Οι σελίδες που παράγονται από την πλατφόρμα μας φορτωνουν σε
                λιγότερο από 0.1 δευτερόλεπτα
              </p>
            </div>
            <div className="flex-1 border border-slate-300 rounded-md p-5 flex flex-col">
              <h3 className="text-lg font-semibold">Προσαρμοστικότητα</h3>
              <p className="text-gray-600">
                Μπορείτε να επεξεργαστείτε τους καταλόγους καθώς και την
                διαθεσιμότητα των προιόντων από τον πίνακα ελέγχου του μαγαζιού
                σας, χωρίς την δική μας παρέμβαση
              </p>
            </div>
            <div className="flex-1 border border-slate-300 rounded-md p-5 flex flex-col">
              <h3 className="text-lg font-semibold">Πολλές διάλεκτοι</h3>
              <p className="">Υποστήριξη αγγλικών και ελληνικών</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-10 flex flex-col">
          <h3 className="text-2xl font-semibold mx-auto">
            Απλή, προβλέψιμη και προσιττή τιμολόγηση:
          </h3>
          <PlansSection />
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-3xl flex flex-col my-10 p-10">
          <h3 className="text-2xl font-semibold mx-auto">
            Όλες οι δυνατότητες:
          </h3>
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Πολλοί κατάλογοι
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Επεξεργασία προϊόντων
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Σύνδεση Social Media
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Σύνδεση Maps
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Αλλαγή διαθεσιμότητας
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Πολλές Γλώσσες
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Εικόνες προϊόντων
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Λογαριασμός Υπαλλήλου
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Υποστήριξη
            </div>
            <div className="border w-full p-2 rounded-lg border-slate-300 hover:scale-105 transition">
              Επεξεργασία καταλόγων
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-3xl flex flex-col my-10 p-10">
          <h3 className="text-2xl font-semibold mx-auto">
            Έχετε κάποια απορία;
          </h3>
          <ContactForm />
        </div>
      </main>
      <BigFooter />
    </>
  );
}

const PlansSection: FC = () => {
  return (
    <div
      id="pricing"
      className="lg:px-10 md:px-5 flex-row justify-center w-full "
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 pt-6 w-full max-w-7xl gap-4 mx-auto">
        <Link
          href="/dash"
          className="w-full bg-slate-100 rounded-lg py-4 px-8 cursor-pointer sm:hover:scale-105 transition ease-in-out flex flex-col"
        >
          <h2 className="font-bold">Μηνιαίο πλάνο</h2>
          <div className="mt-1">
            <p className="text-5xl inline">19€</p>
            <p className="text-lg inline font-light text-gray-900">/μήνα</p>
          </div>
          <p className="font-light mt-1">
            Προτείνεται σε επιχειρήσεις που λειτουργούν ορισμένους μήνες του
            χρόνου
          </p>
          <div className="flex-1 flex flex-col mt-3">
            <ul className="list-disc pl-4 my-auto">
              <li>Όλες οι λειτουργίες </li>
              <li>Στην εγγραφή δίνεται voucher 30€ για αγορές προϊόντων qr</li>
            </ul>
          </div>
          <button className="flex align-middle border border-gray-400 rounded-md p-1 w-full text-gray-600 mt-8 hover:border-black hover:text-black hover:scale-105 transition ease-in-out px-2 group">
            <p className="flex-1 text-left">Φτιάξε το μενού σου!</p>
            <ArrowIcon
              width={16}
              height={16}
              className="inline m-auto group-hover:bg-black group-hover:text-white transition ease-in-out rounded-xl border border-slate-100 group-hover:border-black"
            />
          </button>
        </Link>
        <Link
          href="/dash"
          className="w-full bg-slate-100 rounded-lg py-4 px-8 cursor-pointer sm:hover:scale-105 transition ease-in-out flex flex-col"
        >
          <h2 className="font-bold">Ετήσιο πλάνο</h2>
          <div className="mt-1">
            <p className="text-5xl inline">179€</p>
            <p className="text-lg inline font-light text-gray-900">/χρόνο</p>
          </div>
          <p className="font-light mt-1">
            Προτείνεται στις περισσότερες μικρομεσαίες επιχειρήσεις
          </p>
          <div className="flex-1 flex flex-col mt-3">
            <ul className="list-disc pl-4 my-auto">
              <li>Όλες οι λειτουργίες </li>
              <li>Στην εγγραφή δίνεται voucher 50€ για αγορές προϊόντων qr</li>
            </ul>
          </div>
          <button className="flex align-middle border border-gray-400 rounded-md p-1 w-full text-gray-600 mt-8 hover:border-black hover:text-black hover:scale-105 transition ease-in-out px-2 group">
            <p className="flex-1 text-left">Φτιάξε το μενού σου!</p>
            <ArrowIcon
              width={16}
              height={16}
              className="inline m-auto group-hover:bg-black group-hover:text-white transition ease-in-out rounded-xl border border-slate-100 group-hover:border-black"
            />
          </button>
        </Link>
        <Link
          href="/contact?subject=request-custom"
          className="w-full bg-slate-100 rounded-lg py-4 px-8 cursor-pointer sm:hover:scale-105 transition ease-in-out flex flex-col"
        >
          <h2 className="font-bold">Προσαρμοσμένο πλάνο</h2>
          <p className="font-light mt-1">
            Προτείνεται σε μεγάλες επιχειρήσεις με πολλά παραρτήματα και
            υποκαταστήματα
          </p>
          <div className="flex-1 flex flex-col mt-3">
            <ul className="list-disc pl-4 my-auto">
              <li>Όλες οι λειτουργίες </li>
              <li>
                Σχεδιασμός προσαρμοσμένων λειτουργιών ειδικά για τις ανάγκες της
                επιχείρησής σας
              </li>
              <li>Η τιμή καθορίζεται κατόπιν συνεννόησης</li>
            </ul>
          </div>
          <button className="flex align-middle border border-gray-400 rounded-md p-1 w-full text-gray-600 mt-8 hover:border-black hover:text-black hover:scale-105 transition ease-in-out px-2 group">
            <p className="flex-1 text-left">Κάνε αίτηση</p>
            <ArrowIcon
              width={16}
              height={16}
              className="inline m-auto group-hover:bg-black group-hover:text-white transition ease-in-out rounded-xl border border-slate-100 group-hover:border-black"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};
