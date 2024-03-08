"use client";

import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { usePathname } from "next/navigation";

const SiteHeader = () => {
  useThemeMode();

  let pathname = usePathname();

  return <HeaderLogged />
};

export default SiteHeader;
