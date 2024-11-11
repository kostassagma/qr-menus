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
      <div className="min-h-screen">
        <DashNav shop={shop} />
        hello{shop}
      </div>
      <BigFooter />
    </>
  );
}
