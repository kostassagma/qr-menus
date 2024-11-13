"use client";
import { useAuthState } from "@/app/dash/auth-state";
import ChevronIcon from "@/icons/chevron";
import UserIcon from "@/icons/user";
import { createBrowserClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface Props {
  shop?: string | undefined;
}

const DashNav: FC<Props> = ({ shop }) => {
  const { email, shops } = useAuthState();
  const currentShop = shops ? shops.filter((e) => e.pathname == shop)[0] : null;
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="flex p-2 border-b border-gray-300 gap-3 justify-center sticky top-0 backdrop-blur-2xl z-50 w-full">
      <div className="flex max-w-7xl gap-3 w-full">
        {shop && (
          <div
            className={`flex flex-row gap-2 group cursor-pointer transition-all ease-in-out mr-auto relative overflow-y-visible min-w-28`}
          >
            <div
              className={`flex flex-row gap-2 group cursor-pointer border ${
                expanded
                  ? "border-gray-300 rounded-t-md border-b"
                  : "border-transparent hover:border-gray-300 rounded-md"
              } p-2 transition-all ease-in-out mr-auto relative z-30 bg-white w-full`}
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            >
              <p className="my-auto">
                {currentShop
                  ? currentShop.shop_name.map((e) => e.text).join("/")
                  : "loading"}
              </p>
              <ChevronIcon
                className={`my-auto p-1 rounded-full transition-all ease-in-out ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
                width={25}
              />
            </div>
            {shops && (
              <div
                className={`absolute bottom-0 ${
                  expanded ? "translate-y-full" : "translate-y-0"
                } left-0 border border-t-0 border-gray-300 rounded-b-md bg-white w-full transition-all ease-in-out z-10 flex flex-col gap-1`}
              >
                {shops
                  .filter((e) => e.pathname != shop)
                  .map((shopToBeRendered) => (
                    <Link
                      href={`/dash/${shopToBeRendered.pathname}`}
                      className="my-auto cursor-pointer hover:bg-gray-200 transition-all ease-in-out p-2 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                      key={shopToBeRendered.pathname}
                    >
                      {currentShop
                        ? shopToBeRendered.shop_name
                            .map((e) => e.text)
                            .join("/")
                        : "loading"}
                    </Link>
                  ))}
                <Link
                  href="/dash/new-shop"
                  className="my-auto cursor-pointer hover:bg-gray-200 transition-all ease-in-out p-2"
                >
                  Νέο μαγαζί
                </Link>
              </div>
            )}
            <div className="bg-white absolute bottom-0 w-full z-20 h-96" />
          </div>
        )}
        <div className="flex flex-row gap-2 group cursor-pointer border border-transparent hover:border-gray-300 rounded-md p-2 transition-all ease-in-out ml-auto">
          <p className="my-auto">{email ? email : "login"}</p>
          <UserIcon
            className="my-auto group-hover:bg-gray-200 p-1 rounded-full transition-all ease-in-out"
            width={30}
          />
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
