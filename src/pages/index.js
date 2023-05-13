import Image from "next/image"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchIcon from "@/components/SearchIcon";

import AccountCard from "@/components/AccountCard";

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/accounts");
      const jsonData = await response.json();
      const dataWithSlugs = jsonData.map((account) => {
        const slug = `${account.institution_name} ${account.account_name}`
          .toLowerCase()
          .replace(/ /g, "-");
        return { ...account, id: slug };
      });
      setData(dataWithSlugs);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const links = (
    <>
    <Link href="/browse" className="no-underline hover:underline">Browse</Link>
    <Link href="/blog" className="no-underline hover:underline">Blog</Link>
    <Link href="/about" className="no-underline hover:underline">About</Link>
    <Link href="/contact" className="no-underline hover:underline">Contact</Link>
    </>
  )

  return (
    <div className="flex flex-col min-h-screen p-24">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white hidden md:block">Rate Radar</h1>
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
        {data ? (
          data
            .filter((account) =>
              account.account_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((account) => (
              <Link href={`/accounts/${account.id}`} key={account.id}>
                <AccountCard account={account} />
              </Link>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  </div>
  );
};
