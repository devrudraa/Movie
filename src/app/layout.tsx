import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/lib/Providers";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/component/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IMDb movie search",
  description:
    "A simple web application which allows you to search for movies from a IMBd API server",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <body className={`${inter.className} min-h-screen`}>
          <NextTopLoader color="#f5c518" />
          <main className="max-w-[1280px] mx-auto">
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </Providers>
  );
}
