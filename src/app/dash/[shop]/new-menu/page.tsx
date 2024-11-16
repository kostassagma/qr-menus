import NewMenuPage from "./new-menu";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  return <NewMenuPage shop={shop} />;
}
