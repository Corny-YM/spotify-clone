import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductWithPrices from "@/actions/getActiveProductWithPrices";

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
