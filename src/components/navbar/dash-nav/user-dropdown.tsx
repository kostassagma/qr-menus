"use client";
import { useAuthState } from "@/app/dash/auth-state";
import LogoutIcon from "@/icons/logout";
import SettingsIcon from "@/icons/settings";
import UserIcon from "@/icons/user";
import { FC, useState } from "react";

const UserDropdown: FC = () => {
  const { email } = useAuthState();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {email && (
        <div
          className={`flex flex-row gap-2 group cursor-pointer transition-all ease-in-out ml-auto relative overflow-y-visible max-w-72 sm:max-w-96`}
        >
          <div
            className={`flex flex-row gap-2 group cursor-pointer border  ${
              expanded
                ? "border-gray-300 rounded-t-md border-b-0 md:border-b z-50"
                : "border-transparent hover:border-gray-300 rounded-md z-20"
            } p-2 transition-all ease-in-out ml-auto relative bg-white max-w-96`}
            onClick={() => {
              setExpanded((prev) => !prev);
            }}
          >
            <p className="my-auto three-dots hidden md:block">{email}</p>
            <UserIcon
              className="my-auto group-hover:bg-gray-200 p-1 rounded-full transition-all ease-in-out"
              width={30}
            />
          </div>
          <div
            className={`absolute top-full right-0 z-40 overflow-hidden w-auto min-w-full  ${
              expanded ? "h-auto" : "h-0"
            }`}
            style={{ transition: "height 3s ease-in-out" }}
          >
            {email && (
              <div
                className={`${
                  expanded ? "translate-y-0" : "-translate-y-full"
                } right-0 border md:border-t-0 border-gray-300 rounded-tl-md md:rounded-tl-none rounded-b-md bg-white w-full transition-all ease-in-out z-40 flex flex-col gap-1`}
              >
                <button className="my-auto cursor-pointer hover:bg-gray-200 transition-all ease-in-out p-2 whitespace-nowrap flex flex-row gap-2">
                  <LogoutIcon className="w-5 my-auto" />
                  <p className="my-auto">Αποσύνδεση</p>
                </button>
                <button className="my-auto cursor-pointer hover:bg-gray-200 transition-all ease-in-out p-2 whitespace-nowrap flex flex-row gap-2">
                  <SettingsIcon className="w-5 my-auto" />
                  <p className="my-auto">Ρυθμίσεις</p>
                </button>
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

export default UserDropdown;
