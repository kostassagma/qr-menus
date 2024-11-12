import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SideNav from "../side-nav";
import { Suspense } from "react";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashNav shop={shop} />
        <main className="max-w-5xl mx-auto w-full flex flex-row p-5 gap-5">
          <Suspense>
            <SideNav shopPathname={shop} tab={1} />
          </Suspense>
          <div>Οι κατάλογοι σας:</div>
        </main>
      </div>
      <BigFooter />
    </>
  );
}
