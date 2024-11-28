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
        <main className="w-full flex flex-col px-0 sm:px-2 gap-2 sm:gap-5 sm:flex-row py-0 sm:py-2">
          <Suspense>
            <SideNav shopPathname={shop} />
          </Suspense>
          <section className="flex-1 px-4 sm:px-0 max-w-7xl w-full mx-auto">
            {children}
          </section>
        </main>
      </div>
      <BigFooter />
    </>
  );
}
