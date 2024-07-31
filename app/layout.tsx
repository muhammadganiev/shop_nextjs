import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  profile,
}: Readonly<{
  children: React.ReactNode;
  profile: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <nav className="flex gap-2 justify-between px-4 bg-blue-700 ">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about ">About</Link></li>
          </ul>
        </nav>
            {children}
        </body>
    </html>
  );
}
