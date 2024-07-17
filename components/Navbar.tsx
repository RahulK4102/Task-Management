import React from "react";
import Link from "next/link";
import Image from "next/image";
interface NavbarProps {
  className?: string;
  id?: string;
}


const Navbar = ({ className, id }: NavbarProps) => {
  return (
    <div className={`fixed top-0 w-full z-50 ${className}`}>
      <nav className="flex items-center justify-between px-4 py-2 bg-gray-900 shadow-md">
        <Link href={`/History?id=${id}`}>
          <div className="flex items-center text-white mr-6 cursor-pointer">
            <Image src="/bug.svg" alt="" width={35} height={35} />
            <span className="ml-2 font-semibold">Bug Tracker</span>
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href={`/Dashboard/${id}`}>
            <div className="text-white hover:text-gray-300 transition duration-300 ease-in-out cursor-pointer">Dashboard</div>
          </Link>
          <Link href={`/Issues/${id}`}>
            <div className="text-white hover:text-gray-300 transition duration-300 ease-in-out cursor-pointer">Issues</div>
          </Link>
          {/* Add more navigation links here if needed */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
