import { Suspense } from "react";
import SideNav from "./side-nav";
import DashNav from "@/components/navbar/dash-nav";
import BigFooter from "@/components/footer/big-footer";

export default function ShopLayout({
  children,
  shop,
  tab,
}: Readonly<{
  children: React.ReactNode;
  shop: string;
  tab: number;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <DashNav shop={shop} />
        <main className="max-w-5xl mx-auto w-full flex flex-col p-4 gap-5 sm:flex-row">
          <Suspense>
            <SideNav shopPathname={shop} tab={tab} />
          </Suspense>
          {children}
        </main>
      </div>
      <BigFooter />
    </>
  );
}
