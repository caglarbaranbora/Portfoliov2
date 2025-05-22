"use client";
import Image from "next/image";
import { useState } from "react";
import { BsCopy } from "react-icons/bs";

export default function Hero() {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="py-[20px] px-[80px] border border-b-gray-100">
      <div className="grid grid-rows-2 font-bold text-[174px] pb-[40px]">
        <div className="flex flex-row justify-between items-center">
          <h1>CAGLAR</h1>
          <Image
            className="rounded-full"
            src={"/assets/cags.jpg"}
            alt="caglar bora"
            width={200}
            height={200}
          />
        </div>
        <h1>BARAN BORA</h1>
      </div>
      {/* desc & mail */}
      <div className="flex justify-between pb-[80px]">
        <div className="items-center justify-between">
          <div className="flex justfy-center items-center">
            <button
              className=" p-2 text-[26px] font-medium hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                const email = "boracaglarbaran@gmail.com";
                const mailto = `mailto:${email}`;
                window.location.href = mailto;
              }}
            >
              boracaglarbaran@gmail.com
            </button>
            <BsCopy
              className=" hover:text-red-500"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    "boracaglarbaran@gmail.com"
                  );
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                } catch (err) {
                  console.error("Kopyalama hatası:", err);
                }
              }}
            />
          </div>
        </div>
        <p className="w-[60%] font-medium text-[40px]">
          <span className="pl-[60px]">Hello</span>, I’m a Front-End Developer
          specializing in <span className="font-bold">Web Technologies </span>
          with 1 year of expertise ― based in Turkey, working as freelancer.
          Let's Code!
        </p>
      </div>
    </div>
  );
}
