"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu.tsx";
import Link from "next/link.js";
import { cn } from "@/utils/cn";
import Image from "next/image.js";
function Navbar ({ className }: { className?: string }) {
  
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)} >
      <Menu setActive={setActive} >
        <Link className=" absolute left-[3.75rem] top-[17px] " href={"/"} >
          <Image src="/bug.svg"
            alt=""  width={35}
            height={35}/>
        </Link>
        <Link href={"/"} >
          <MenuItem setActive={setActive} active={active} item="Dashboard" ></MenuItem>
        </Link>
        <Link href={"/Issues"} >
          <MenuItem setActive={setActive} active={active} item="Issues" ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}


export default Navbar
