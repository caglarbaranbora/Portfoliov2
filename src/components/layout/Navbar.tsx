"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center px-[18px] py-[15px] border border-b-gray-100">
      <h1 className="text-[30px] font-bold">CAGLAR</h1>
      {isOpen ? (
        <div className="flex gap-5 items-center">
          <div className="flex gap-5 text-[18px] font-semibold items-center">
            <Link href={"/work"}>Works</Link>
            <Link href={"/work"}>About</Link>
            <Link href={"/work"}>Contact</Link>
          </div>
          <Image
            src={"/assets/menu-icon-x.svg"}
            width={75}
            height={75}
            alt="menu-close-icon"
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          />
        </div>
      ) : (
        <Image
          src={"/assets/menu-icon.svg"}
          width={75}
          height={75}
          alt="menu-icon"
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        />
      )}
    </div>
  );
}
