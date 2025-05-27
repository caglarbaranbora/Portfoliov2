"use client";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

interface ProjectProps {
  index: number;
  title: string;
  status: string;
  href: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

export default function Project({
  index,
  title,
  manageModal,
  status,
  href,
}: ProjectProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      onClick={handleClick}
      className={`${styles.project} cursor-pointer`}
    >
      <h2>{title}</h2>
      <p>{status}</p>
    </div>
  );
}
