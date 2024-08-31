import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import HeroesList from "@/pages/HeroesList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Herodex",
  description: "An app for consulting Marvel heroes and villains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="marvel-regular">
        <Header />
        <HeroesList />
        <Footer />
        {children}
      </body>
    </html>
  );
}