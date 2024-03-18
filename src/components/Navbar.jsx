import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-3 mb-2">
        <Link href="/">
          <h3 className="text-3xl">NextMySQL</h3>
        </Link>
        <ul>
          <li>
            <Link href="/new" className="text-sky-500 hover:text-sky-400">
              New
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
