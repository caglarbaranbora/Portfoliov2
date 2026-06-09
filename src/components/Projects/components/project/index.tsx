"use client";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

interface ProjectProps {
  title: string;
  status: string;
  href?: string;
}

export default function Project({ title, status, href }: ProjectProps) {
  const router = useRouter();

  return (
    <div
      onClick={href ? () => router.push(href) : undefined}
      className={`${styles.project} ${href ? "cursor-pointer" : "cursor-default"}`}
    >
      <h2>{title}</h2>
      <p>{status}</p>
    </div>
  );
}
