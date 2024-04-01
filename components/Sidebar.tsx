"use client";

import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { Song } from "@/types/common";
import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";

interface Props {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: Props) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        active: pathname !== "/search",
        icon: HiHome,
      },
      {
        label: "Search",
        href: "/search",
        active: pathname === "/search",
        icon: BiSearch,
      },
    ],
    []
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <div className="h-full flex-1 overflow-y-auto py-2">{children}</div>
    </div>
  );
};

export default Sidebar;
