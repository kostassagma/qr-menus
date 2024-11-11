import QrIcon from "@/icons/qr";
import Link from "next/link";
import { FC } from "react";

const MinimalNav: FC = () => {
  return (
    <nav className="flex p-3 border-b border-gray-300 gap-3 justify-center sticky top-0 backdrop-blur-2xl z-50 w-full">
      <div className="flex max-w-7xl gap-3 w-full">
        <Link href="/" className="flex mr-auto align-middle my-auto">
          <QrIcon
            width={22}
            className="text-black inline-block mr-1"
          />
          <h1 className="font-semibold text-2xl max-[350px]:text-xl">Qr</h1>
          <h1 className="font-light text-2xl max-[350px]:text-xl">Menus</h1>
        </Link>
      </div>
    </nav>
  );
};

export default MinimalNav;
