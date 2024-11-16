"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SetName from "./set-name";
import AddCategories from "./add-categories";
import SetLangs from "./set-langs";

export default function NewMenuPage({ shop }: { shop: string }) {
  // const shop = (await params).shop;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashNav shop={shop} />
        <form className="p-4 max-w-5xl w-full mx-auto flex flex-col gap-5 py-10">
          <h1 className="text-2xl mb-4 font-bold">Δημιουργία Νέου Καταλόγου</h1>
          <SetLangs shop={shop} />
          <SetName />
          <AddCategories />
          <div className="flex flex-col">
            <h1 className="text-xl">&#8594; Τέλος, υποβάλετε τον κατάλογο:</h1>
            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline hover:scale-[1.02] transition ease-in-out mt-auto mx-auto z-10"
            >
              Υποβολή του καταλόγου
            </button>
          </div>
        </form>
      </div>
      <BigFooter />
    </>
  );
}
