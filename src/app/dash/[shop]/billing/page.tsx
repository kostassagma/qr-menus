import ShopLayout from "../shop-layout";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  return (
    <ShopLayout tab={2} shop={shop}>
      Πληρωμές
    </ShopLayout>
  );
}
