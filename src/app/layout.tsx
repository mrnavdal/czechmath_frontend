import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { MockedBackend } from "@/services/MockedBackend";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CzechMath",
  description: "CzechMath",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
