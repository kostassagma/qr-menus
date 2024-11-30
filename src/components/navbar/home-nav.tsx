import QrIcon from "@/icons/qr";
import WebIcon from "@/icons/web";
import Link from "next/link";
import { FC } from "react";

export const links = [
  {
    label: "Τιμολόγηση",
    href: "/pricing",
  },
  {
    label: "Επικοινωνία",
    href: "/contact",
  },
];

export const cta = {
  label: "Φτιάξε Μενού",
  href: "/auth",
};

const HomeNav: FC = () => {
  return (
    <nav className="flex p-3 border-b border-gray-300 gap-3 justify-center sticky top-0 backdrop-blur-2xl z-50 w-full">
      <div className="flex max-w-7xl gap-3 w-full">
        <Link
          href="/"
          className="flex mr-auto align-middle my-auto hover:scale-105 transition"
        >
          <QrIcon width={22} className="text-black inline-block mr-1" />
          <h1 className="font-semibold text-2xl max-[350px]:text-xl">Qr</h1>
          <h1 className="font-light text-2xl max-[350px]:text-xl">Menus</h1>
        </Link>
        <ul className="gap-5 flex-1 items-center justify-end  hidden md:flex text-gray-800 mr-5">
          {links.map(({ label, href }, i) => (
            <Link href={href} key={i}>
              <li className="cursor-pointer transition duration-300 group hover:text-black hover:scale-105">
                {label}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-[0.5px] bg-black -translate-y-[5px]"></span>
              </li>
            </Link>
          ))}
        </ul>
        <Link
          href={cta.href}
          className="bg-accent hover:scale-105 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded transition ease-in-out relative group overflow-hidden flex"
        >
          <WebIcon
            className="group-hover:translate-y-5 group-hover:translate-x-5 -top-10 -left-10 absolute transition ease-in-out"
            width={40}
          />
          <WebIcon
            className="group-hover:-translate-y-5 group-hover:-translate-x-5 -bottom-10 -right-10 absolute transition ease-in-out"
            width={40}
          />
          {cta.label}
        </Link>
      </div>
    </nav>
  );
};

export default HomeNav;
