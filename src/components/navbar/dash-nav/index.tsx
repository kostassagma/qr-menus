"use client";
import { useAuthState } from "@/app/dash/auth-state";
import ChevronIcon from "@/icons/chevron";
import UserIcon from "@/icons/user";
import Link from "next/link";
import { FC, useState } from "react";
import ShopDropdown from "./shops-dropdown";
import UserDropdown from "./user-dropdown";

interface Props {
  shop?: string | undefined;
}

const DashNav: FC<Props> = ({ shop }) => {
  const { email } = useAuthState();

  return (
    <nav className="flex p-2 border-b border-gray-300 gap-3 justify-center sticky top-0 backdrop-blur-2xl z-50 w-full">
      <div className="flex max-w-7xl gap-3 w-full">
        <ShopDropdown shop={shop} />
        <UserDropdown/>
      </div>
    </nav>
  );
};

export default DashNav;
