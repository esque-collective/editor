import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { EditorHeader } from "./_components/header/editor-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: { template: "Esque — %s", default: "Esque" },
  description: "Esque Editor is a DX-first CMS for Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <EditorHeader />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
