import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modals/Modal";
import RegisterModal from "./components/Modals/RegisterModal";
import ToastProvider from "./components/Provider/ToastProvider";
import LoginModal from "./components/Modals/LoginModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "A next learning project by Devin Anugrah ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
