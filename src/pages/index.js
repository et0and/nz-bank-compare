import { Inter } from "next/font/google"
import { useState } from "react";
import Link from "next/link";

import SearchIcon from "@/components/SearchIcon";
import AccountCard from "@/components/AccountCard";
import { fetchAccounts } from "@/helpers";

const inter = Inter({ subsets: ["latin"] })

export default function Home({ accounts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = (
    <>
    <Link href="/browse" className="no-underline hover:underline">Browse</Link>
    <Link href="/blog" className="no-underline hover:underline">Blog</Link>
    <Link href="/about" className="no-underline hover:underline">About</Link>
    <Link href="/contact" className="no-underline hover:underline">Contact</Link>
    </>
  );

  return (
    <div className={`flex flex-col min-h-screen p-24 ${inter.className}`}>
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white hidden md:block">Rates Radar</h1>
        <div className="space-x-4 hidden md:flex">
            {links}
        </div>
        <button className="md:hidden text-2xl no-underline hover:underline" onClick={() => setMenuOpen(!menuOpen)}>
          Menu
        </button>
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search"
            className="w-1/6 px-3 py-1 border rounded text-black md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setSearchOpen(false)}
          />
        ) : (
          <button className="md:hidden" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
        )}
        <input
          type="text"
          placeholder="Search"
          className="w-1/6 px-3 py-1 border rounded text-black md:block hidden"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </nav>
      {menuOpen && (
        <div className="flex flex-col space-y-2 mb-12 md:hidden">
          {links}
        </div>
      )}
      <main className="flex-1 flex flex-col items-center justify-between mt-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts ? (
          accounts.map((account, index) => (
            <AccountCard account={account} key={index} />
          ))
        ) : (  // If data does not exist
          <p>Loading...</p>  // Display a loading message
        )}
      </div>
    </main>
  </div>
  );
};

// Define getStaticProps function to fetch data at build time
export async function getStaticProps() {
  let accounts = []
  try {
    // Fetch account data from the API endpoint
    accounts = await fetchAccounts();
  } catch (error) {
    console.log("Error:", error);
    // If an error occurs, initialize data with an empty array
    accounts = [];
  }

  // Return the data as props to the Home component
  return {
    props: {
      accounts,
    },
  };
};