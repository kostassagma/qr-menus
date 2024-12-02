import MinimalNav from "@/components/navbar/minimal-nav";
import Link from "next/link";

export default function EmailLogin() {
  return (
    <>
      <main className="h-screen flex flex-col">
        <MinimalNav />
        <div className="p-4 flex w-full h-full">
          <div className="m-auto max-w-md w-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2 transition-all ease-in-out">
              <h1 className="text-xl font-semibold">
                Πατήστε τον λινκ που στείλαμε στο μειλ σας.
              </h1>
              <Link
                href="/auth"
                className="my-auto cursor-pointer text-red-500 font-light hover:underline mr-auto"
              >
                ← Πίσω
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Qr Menus. All rights reserved.
        </p>
      </main>
    </>
  );
}
