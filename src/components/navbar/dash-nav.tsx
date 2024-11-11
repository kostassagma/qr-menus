import ChevronIcon from "@/icons/chevron";
import UserIcon from "@/icons/user";
import { FC } from "react";

const DashNav: FC = () => {
  return (
    <nav className="flex p-2 border-b border-gray-300 gap-3 justify-center sticky top-0 backdrop-blur-2xl z-50 w-full">
      <div className="flex max-w-7xl gap-3 w-full">
        <div className="flex flex-row gap-2 group cursor-pointer border border-transparent hover:border-gray-300 rounded-md p-2 transition-all ease-in-out mr-auto">
          <p className="my-auto">Bien</p>
          <ChevronIcon
            className="my-auto p-1 rounded-full transition-all ease-in-out"
            width={25}
          />
        </div>
        <div className="flex flex-row gap-2 group cursor-pointer border border-transparent hover:border-gray-300 rounded-md p-2 transition-all ease-in-out">
          <p className="my-auto">Kostas Sagma</p>
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
