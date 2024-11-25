import QrCodeSnippet from "@/components/qr-code-snippet";


export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  return (
    <div>
      <h1></h1>
      <div className="flex flex-row">
        <div className="">Hello</div>
        <div className="rounded-lg p-5 border border-gray-300 transition ease-in-out hover:border-gray-500">
          <QrCodeSnippet link={`/s/${shop}`} />
        </div>
      </div>
    </div>
  );
}
