import ArrowIcon from "@/icons/arrow";
import Link from "next/link";
import { FC } from "react";

const Products: FC = () => {
  return (
    <div
      id="pricing"
      className="lg:px-10 md:px-5 px-3 flex-row justify-center w-full "
    >
      <h1 className="w-full max-w-6xl px-4 mx-auto text-xl font-bold">
        Προϊόντα qr
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 pt-6 w-full max-w-6xl p-4 gap-4 mx-auto">
        <Link
          href="/dash"
          className="w-full bg-slate-100 rounded-lg py-4 px-8 cursor-pointer sm:hover:scale-105 transition ease-in-out flex flex-col"
        >
          <h2 className="font-bold">Αυτόματη Δημιουργία Μενού</h2>
          <div className="mt-1">
            <p className="text-5xl inline">19€</p>
            <p className="text-lg inline font-light text-gray-900">/κατάλογο</p>
          </div>
          <p className="font-light mt-1">
            Με αυτήν την υπηρεσία μας στέλνετε μία φωτογραφία του καταλόγου σας
            και αφήνετε την δημιουργία του μενού πάνω μας
          </p>
          <div className="flex-1" />
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
          <h2 className="font-bold">Φωτογράφιση</h2>
          <div className="mt-1">
            <p className="text-5xl inline">10€</p>
            <p className="text-lg inline font-light text-gray-900">
              /φωτογραφία
            </p>
          </div>
          <p className="font-light mt-1">
            Ερχόμαστε στον χώρο σας για να φωτογραφίσουμε τα προιόντα σας
          </p>
          <div className="flex-1" />
          <button className="flex align-middle border border-gray-400 rounded-md p-1 w-full text-gray-600 mt-8 hover:border-black hover:text-black hover:scale-105 transition ease-in-out px-2 group">
            <p className="flex-1 text-left">Φτιάξε το μενού σου!</p>
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

export default Products;
