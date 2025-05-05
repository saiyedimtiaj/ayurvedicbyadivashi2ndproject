/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon | any;
  isActive?: boolean | any;
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            className={`py-4 ${
              item.isActive ? "bg-green-700 text-white" : ""
            } hover:bg-green-700 hover:text-white`}
            asChild
          >
            <Link href={item.url} className="flex items-center gap-2">
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
