"use client";

import LangsIcon from "@/icons/langs";
import { useSwitchLangState } from "./switch-lang-state";

export default function SwitchLangsButton() {
  const { setSwitching } = useSwitchLangState();
  return (
    <button
      className="absolute top-3 right-3 p-3 bg-gray-800 text-white rounded-full"
      onClick={(e) => {
        e.preventDefault();
        setSwitching(true);
      }}
    >
      <LangsIcon width={15} />
    </button>
  );
}
