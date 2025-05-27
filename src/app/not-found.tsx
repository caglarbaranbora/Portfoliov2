"use client";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid grid-rows-1">
      <div className="flex-1 flex-col items-start justify-start px-[80px] py-[50px]">
        <h1 className="text-[174px] font-semibold">PAGE</h1>
        <h1 className="text-[174px] font-semibold">NOT</h1>
        <h1 className="text-[174px] font-semibold">FOUND</h1>
        <div className="flex justify-between items-center">
          <Button title={"Back Home"} path={"/"} />
          <h5 className="font-semibold text-[30px]">404</h5>
        </div>
      </div>
    </div>
  );
}
