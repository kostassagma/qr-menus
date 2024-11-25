"use client";
import BagIcon from "@/icons/bag";
import CreditIcon from "@/icons/credit";
import HouseIcon from "@/icons/house";
import ListIcon from "@/icons/list";
import SettingsIcon from "@/icons/settings";
import Link from "next/link";
import { FC, useState } from "react";

interface Props {
  tab: number;
  shopPathname: string;
}

const SideNav: FC<Props> = ({ tab, shopPathname }) => {
  const [selected, setSelected] = useState(tab);

  return (
    <ul
      className="flex flex-row sm:flex-col gap-1 relative z-10 overflow-x-scroll overflow-y-hidden sm:overflow-auto pb-1 sm:pb-0"
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
            className={`cursor-pointer py-1 px-4 text-black ${
              i == selected ? "sm:text-white" : "sm:text-black"
            } transition-all ease-in-out z-10 relative`}
          >
            <li className="whitespace-nowrap flex flex-row gap-2">
              {/* @ts-expect-error stupid error smh */}
              {labels[e][1]}
              {/* @ts-expect-error stupid error smh */}
              <p className="my-auto"> {labels[e][0]}</p>
            </li>
            {selected == i && (
              <span className="absolute bg-black h-1 w-3/4 rounded-t-full bottom-0 left-1/2 -translate-x-1/2 sm:hidden" />
            )}
          </Link>
        )
      )}
      <div
        className="absolute w-full rounded-md h-[32px] bg-black transition-all ease-in-out z-0 hidden sm:block left-0"
        style={{
          top: selected * 36,
        }}
      />
    </ul>
  );
};

export default SideNav;

const labels = {
  miscellaneous: [
    "Γενικά",
    <HouseIcon width={20} className="my-auto" key={"miscellaneous"} />,
  ],
  menus: [
    "Κατάλογοι",
    <ListIcon width={20} className="my-auto" key={"menus"} />,
  ],
  billing: [
    "Χρεώσεις",
    <CreditIcon width={20} className="my-auto" key={"billing"} />,
  ],
  items: ["Προϊόντα", <BagIcon width={20} className="my-auto" key={"items"} />],
  other: [
    "Άλλες Ρυθμίσεις",
    <SettingsIcon width={20} className="my-auto" key={"other"} />,
  ],
};
