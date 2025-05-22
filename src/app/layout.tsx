import "./globals.css";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Caglar Bora",
  description: "Caglar Bora - Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
