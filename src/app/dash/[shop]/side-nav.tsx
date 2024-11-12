"use client";
import Link from "next/link";
import { FC, useState } from "react";

interface Props {
  tab: number;
  shopPathname: string;
}

const SideNav: FC<Props> = ({ tab, shopPathname }) => {
  const [selected, setSelected] = useState(tab);

  return (
    <ul className="flex flex-col gap-1 relative z-10">
      {["miscellaneous", "menus", "billing", "other"].map((e: string, i) => (
        <Link
          href={`/dash/${shopPathname}/${e}`}
          key={i}
          onClick={() => {
            setSelected(i);
          }}
          className={`cursor-pointer py-1 px-4 ${
            i == selected ? "text-white" : "text-black"
          } transition-all ease-in-out z-10`}
        >
          {/* @ts-expect-error stupid error smh */}
          <li>{labels[e]}</li>
        </Link>
      ))}
      <div
        className="absolute w-full rounded-md h-[32px] bg-black transition-all ease-in-out z-0"
        style={{
          top: selected * 36,
        }}
      />
    </ul>
  );
};

export default SideNav;

const labels = {
  miscellaneous: "Γενικά",
  menus: "Κατάλογοι",
  billing: "Χρεώσεις",
  other: "Άλλες Ρυθμίσεις",
};
