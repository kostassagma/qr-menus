"use client";
import { useAuthState } from "@/app/dash/auth-state";
import ChevronIcon from "@/icons/chevron";
import Link from "next/link";
import { FC, useState } from "react";

interface Props {
  shop?: string | undefined;
}

const ShopDropdown: FC<Props> = ({ shop }) => {
  const { shops } = useAuthState();
  const currentShop = shops ? shops.filter((e) => e.pathname == shop)[0] : null;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {shop && (
        <div
          className={`flex flex-row gap-2 group cursor-pointer transition-all ease-in-out mr-auto relative overflow-y-visible max-w-72 sm:max-w-96`}
        >
          <div
            className={`flex flex-row gap-2 group cursor-pointer border ${
              expanded
                ? "border-gray-300 rounded-t-md border-b z-50"
                : "border-transparent hover:border-gray-300 rounded-md z-20"
            } p-2 transition-all ease-in-out mr-auto relative bg-white w-full`}
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
          >
            <p className="my-auto three-dots">
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
          <div
            className={`absolute top-full z-40 overflow-hidden w-full ${
              expanded ? "h-auto" : "h-0"
            }`}
            style={{ transition: "height 3s ease-in-out" }}
          >
            {shops && (
              <div
                className={`${
                  expanded ? "translate-y-0" : "-translate-y-full"
                } left-0 border border-t-0 border-gray-300 rounded-b-md bg-white w-full transition-all ease-in-out z-40 flex flex-col gap-1`}
              >
                {shops
                  .filter((e) => e.pathname != shop)
                  .map((shopToBeRendered) => (
                    <Link
                      href={`/dash/${shopToBeRendered.pathname}`}
                      className="my-auto cursor-pointer hover:bg-gray-200 transition-all ease-in-out p-2 max-w-full three-dots"
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
          </div>
        </div>
      )}
      {expanded && (
        <div
          className="w-full h-screen top-0 left-0 fixed z-30"
          onClick={(e) => {
            e.preventDefault();
            setExpanded(false);
          }}
        />
      )}
    </>
  );
};

export default ShopDropdown;
