import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FiberChat } from "@/components/FiberChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Cloud Communication LLC | Fiber Infrastructure & Construction",
    template: "%s | Cloud Communication LLC",
  },
  description:
    "US-based fiber infrastructure contractor. Backbone to broadband — underground, aerial, HDD, splicing, testing. Dallas/DFW and Texas. Carriers, data centers, municipalities, GCs.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Cloud Communication LLC | Fiber Infrastructure & Construction",
    description:
      "US-based fiber infrastructure contractor. Backbone to broadband. Dallas/DFW and Texas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FiberChat />
      </body>
    </html>
  );
}
