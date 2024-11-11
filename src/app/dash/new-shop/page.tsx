"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import { useNewShopState } from "./new-shop-state";
import SelectLanguages from "./select-languages";

export default function Dash() {
  const {} = useNewShopState();

  return (
    <>
      <div className="min-h-screen">
        <DashNav />
        <main className="p-4 max-w-5xl w-full mx-auto">
          <h1 className="text-2xl mb-4">Δημιουργία Μαγαζιού</h1>
          <SelectLanguages />
        </main>
      </div>
      <BigFooter />
    </>
  );
}
