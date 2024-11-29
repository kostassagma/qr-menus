"use client";
import BagIcon from "@/icons/bag";
import CreditIcon from "@/icons/credit";
import HouseIcon from "@/icons/house";
import ListIcon from "@/icons/list";
import SettingsIcon from "@/icons/settings";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HouseFillIcon from "@/icons/house-fill";
import SettingsFillIcon from "@/icons/settings-fill";
import CreditFillIcon from "@/icons/creadit-fill";
import BagFillIcon from "@/icons/bag-fill";

interface Props {
  shopPathname: string;
}

const SideNav: FC<Props> = ({ shopPathname }) => {
  const [selected, setSelected] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname.split("/")[3]) {
      case "miscallaneous":
        setSelected(0);
        break;
      case "menus":
        setSelected(1);
        break;
      case "items":
        setSelected(2);
        break;
      case "billing":
        setSelected(3);
        break;
      case "other":
        setSelected(4);
        break;
    }
  }, [pathname]);

  return (
    <ul
      className="flex flex-row sm:flex-col gap-1 z-10 overflow-x-scroll overflow-y-hidden sm:overflow-auto py-1 sm:pb-0 px-2 sm:px-0 sticky top-16 bg-white border-b border-gray-300 sm:border-transparent"
      style={{
        scrollbarWidth: "none",
      }}
    >
      {["miscellaneous", "menus", "items", "billing", "other"].map(
        (e: string, i) => (
          <Link
            href={`/dash/${shopPathname}/${e}`}
            key={i}
            onClick={() => {
              setSelected(i);
            }}
            className={`cursor-pointer py-1 px-4 ${
              i == selected ? "text-white bg-accent" : "text-black"
            } transition-all ease-in-out z-10 relative rounded-md`}
          >
            <li className="whitespace-nowrap flex flex-row gap-2">
              {/* @ts-expect-error stupid error smh */}
              {i == selected ? labels[e][2] : labels[e][1]}
              {/* @ts-expect-error stupid error smh */}
              <p className="my-auto"> {labels[e][0]}</p>
            </li>
          </Link>
        )
      )}
    </ul>
  );
};

export default SideNav;

const labels = {
  miscellaneous: [
    "Γενικά",
    <HouseIcon width={20} className="my-auto" key={"miscellaneous"} />,
    <HouseFillIcon width={20} className="my-auto" key={"miscellaneous"} />,
  ],
  menus: [
    "Κατάλογοι",
    <ListIcon width={20} className="my-auto" key={"menus"} />,
    <ListIcon width={20} className="my-auto" key={"menus"} />,
  ],
  billing: [
    "Χρεώσεις",
    <CreditIcon width={20} className="my-auto" key={"billing"} />,
    <CreditFillIcon width={20} className="my-auto" key={"billing"} />,
  ],
  items: [
    "Προϊόντα",
    <BagIcon width={20} className="my-auto" key={"items"} />,
    <BagFillIcon width={20} className="my-auto" key={"items"} />,
  ],
  other: [
    "Άλλες Ρυθμίσεις",
    <SettingsIcon width={20} className="my-auto" key={"other"} />,
    <SettingsFillIcon width={20} className="my-auto" key={"other"} />,
  ],
};
