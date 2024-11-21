import DashNav from "@/components/navbar/dash-nav";
import { Suspense } from "react";
import SideNav from "./side-nav";
import BigFooter from "@/components/footer/big-footer";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ shop: string }>;
  children: React.ReactNode;
}) {
  const shop = (await params).shop;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashNav shop={shop} />
        <main className="max-w-7xl mx-auto w-full flex flex-col px-0 sm:px-4 gap-2 sm:gap-5 sm:flex-row py-2">
          <Suspense>
            <SideNav shopPathname={shop} tab={0} />
          </Suspense>
          <section className="flex-1 px-4 sm:px-0">{children}</section>
        </main>
      </div>
      <BigFooter />
    </>
  );
}
