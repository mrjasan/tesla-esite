import React from "react";
import Logo from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical, Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-10 border-b border-gray-100 shadow-sm flex items-center flex-row justify-between">
      <div className="">
        <Logo />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'outline'}>
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Site</DropdownMenuItem>
            <DropdownMenuItem>View Sites</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
