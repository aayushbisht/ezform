import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EZForm - Simple Form Builder",
  description: "Create beautiful forms with ease using EZForm",
};

function Navbar() {
  return (
    <nav className=" border-gray-200">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              EZForm
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/features" className="text-gray-900 hover:text-gray-600 px-3 py-2">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-900 hover:text-gray-600 px-3 py-2">
              Pricing
            </Link>
            <Link href="/docs" className="text-gray-900 hover:text-gray-600 px-3 py-2">
              Contact Us
            </Link>
          </div>
          <div>
            <Link href="/login" className="text-gray-600 hover:text-gray-300 px-3 py-2">
              Login
            </Link>
            <Link href="/signup" className=" text-gray-600 px-4 py-2 rounded-md hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="/builder" className=" text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800">
              Create Form
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
