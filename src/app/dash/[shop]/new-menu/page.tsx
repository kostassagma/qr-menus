import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";

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
        <main className="max-w-5xl mx-auto w-full flex flex-col p-5 gap-5 sm:flex-row">
          Hello
        </main>
      </div>
      <BigFooter />
    </>
  );
}
