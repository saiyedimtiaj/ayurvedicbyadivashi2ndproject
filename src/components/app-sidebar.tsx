"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../assets/ADIVASHI-LOGOiu-01.png";
import { NavMain } from "./ui/NavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: MdDashboard,
        isActive: pathname === "/admin",
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="w-24 mx-auto"
          width={300}
          height={300}
        />
      </Link>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent />
      <SidebarRail />
    </Sidebar>
  );
}
