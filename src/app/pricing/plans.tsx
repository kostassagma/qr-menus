import ArrowIcon from "@/icons/arrow";
import Link from "next/link";
import { FC } from "react";

const PlansSection: FC = () => {
  return (
    <div
      id="pricing"
      className="lg:px-10 md:px-5 px-3 flex-row justify-center w-full "
    >
      <h1 className="w-full max-w-6xl px-4 mx-auto text-xl font-bold">
        Χρέωση συντήρησης του site
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 pt-6 w-full max-w-6xl p-4 gap-4 mx-auto">
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
              <li>
                Υποστήριξη πολλών καταλόγων με έξτρα χρέωση 5€ ανά έξτρα μενού
              </li>
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
              <li>
                Υποστήριξη πολλών καταλόγων με έξτρα χρέωση 40€ ανά έξτρα μενού
              </li>
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

export default PlansSection;
