import BigFooter from "@/components/footer/big-footer";
import DashNav from "@/components/navbar/dash-nav";
import SetName from "./set-name";
import AddCategories from "./add-categories";

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
        <main className="p-4 max-w-5xl w-full mx-auto flex flex-col gap-5 py-10">
          <h1 className="text-2xl mb-4 font-bold">Δημιουργία Νέου Καταλόγου</h1>
          <SetName />
          <AddCategories />
        </main>
      </div>
      <BigFooter />
    </>
  );
}
