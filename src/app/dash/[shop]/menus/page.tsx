import Link from "next/link";
import ShopLayout from "../shop-layout";
import PlusIcon from "@/icons/plus";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;

  return (
    <ShopLayout tab={1} shop={shop}>
      <div className="flex-1">
        <h2 className="text-xl mb-3">Οι κατάλογοι του μαγαζιού:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {["a", "a", "a", "a", "a", "a", "a", "a", "a"].map((menu, i) => (
            <Link
              href={`/dash/${menu}`}
              key={i}
              className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500"
            >
              {menu}
            </Link>
          ))}
          <Link
            href={`/dash/${shop}/new-menu`}
            className="rounded-lg p-5 border border-gray-300 hover:cursor-pointer hover:scale-105 transition ease-in-out hover:border-gray-500 flex flex-row gap-2 group"
          >
            <PlusIcon
              width={20}
              className="group-hover:rotate-180 transition ease-in-out duration-300"
            />
            <h1 className="font-medium">Νέος κατάλογος</h1>
          </Link>
        </div>
      </div>
    </ShopLayout>
  );
}
