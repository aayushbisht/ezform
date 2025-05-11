import Link from "next/link";

function Navbar() {
  return (
      <div className="mx-auto py-2 px-4 sm:px-6 lg:px-8">
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
            <Link href="/signup" className="text-gray-600 px-4 py-2 rounded-md hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="/builder" className="text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800">
              Create Form
            </Link>
          </div>
        </div>
      </div>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
} 