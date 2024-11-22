"use client";
import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import Link from "next/link";
import { useAuthState } from "./auth-state";
import PlusIcon from "@/icons/plus";

export default function Dash() {
  const { email, shops } = useAuthState();

  return (
    <>
      <div className="min-h-screen">
        <DashNav />
        <main>
          <div className="flex p-4">
            <div className="mx-auto max-w-5xl w-full">
              <h1 className="text-2xl font-semibold">Γεία σας, {email}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
                {shops &&
                  shops.map((shop, i) => (
                    <Link
                      href={`/dash/${shop.pathname}`}
                      key={i}
                      className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500"
                    >
                      <h1 className="font-medium three-dots">
                        {shop.shop_name.map((e) => e.text).join("/")}
                      </h1>
                    </Link>
                  ))}
                <Link
                  href={`/dash/new-shop`}
                  className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 flex flex-row gap-2 group"
                >
                  <PlusIcon width={20} className="group-hover:rotate-180 transition ease-in-out duration-300"/>
                  <h1 className="font-medium">
                    Νέο μαγαζί
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BigFooter />
    </>
  );
}
