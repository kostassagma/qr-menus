import { FC } from "react";
import ShopDropdown from "./shops-dropdown";
import UserDropdown from "./user-dropdown";

interface Props {
  shop?: string | undefined;
}

const DashNav: FC<Props> = ({ shop }) => {
  return (
    <nav className="flex p-2 border-b border-gray-300 gap-3 justify-center sticky top-0 bg-white z-50 w-full h-16">
      <div className="flex gap-3 w-full">
        <ShopDropdown shop={shop} />
        <UserDropdown />
      </div>
    </nav>
  );
};

export default DashNav;
