import QrIcon from "@/icons/qr";
import Link from "next/link";
import { FC } from "react";

const BigFooter: FC = () => {
  return (
    <footer className="pt-20 border-t border-gray-300">
      <div className="flex px-10 gap-5 lg:flex-row flex-col max-w-7xl mx-auto">
        <div className="w-full">
          <Link
            href="/"
            className="flex lg:justify-start justify-center align-middle my-auto"
          >
            <QrIcon width={22} className="text-black inline-block mr-1" />
          <h1 className="font-semibold text-2xl max-[350px]:text-xl">Qr</h1>
          <h1 className="font-light text-2xl max-[350px]:text-xl">Menus</h1>
          </Link>
        </div>
        <div className="w-full">
          <h3 className="font-semibold mb-3">Products</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/products/menus">Online Menu</Link>
            </li>
            <li>
              <Link href="/products/menus">Static Site</Link>
            </li>
            <li>
              <Link href="/products/menus">E-Commerce Site</Link>
            </li>
            <li>
              <Link href="/products/menus">Online Delivery</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h3 className="font-medium mb-3">Explore</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/products/menus">Pricing</Link>
            </li>
            <li>
              <Link href="/products/menus">Blog</Link>
            </li>
            <li>
              <Link href="/products/menus"></Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h3 className="font-medium mb-3">Support</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/products/menus">Customer Support</Link>
            </li>
            <li>
              <Link href="/products/menus">Report Issue</Link>
            </li>
            <li>
              <Link href="/products/menus">Request Refund</Link>
            </li>
            <li>
              <Link href="/products/menus"></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full py-10 text-center text-gray-900">
        <h3>© 2024 Konstantinos Sagmatopoulos</h3>
      </div>
    </footer>
  );
};

export default BigFooter;
