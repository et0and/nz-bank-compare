import { Inter } from "next/font/google"
import { useState } from "react";
import Meta from "@/components/Meta";
import Nav from "@/components/Nav";
import SearchBar from "@/components/SearchBar";
import AccountCard from "@/components/AccountCard";

import { fetchAccountsData } from "@/helpers";

const inter = Inter({ subsets: ["latin"] })

export default function Home({ accounts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className={`flex flex-col min-h-screen px-4 md:px-24 py-8 md:py-24 ${inter.className}`}>
      <Meta />
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white hidden md:block">Rates Radar</h1>
        <div className="space-x-4 hidden md:flex">
          <Nav />
        </div>
        <button className="md:hidden text-2xl no-underline hover:underline" onClick={() => setMenuOpen(!menuOpen)}>
          Menu
        </button>
        <SearchBar onSearch={handleSearch} />
      </nav>
      {menuOpen && (
        <div className="flex flex-col space-y-2 mb-12 md:hidden">
          <Nav />
        </div>
      )}
      <main className="flex-1 flex flex-col items-center justify-between mt-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts ? (
          accounts.filter((account) =>
            account.account_name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((account, index) => (
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
  let accountsData = []
  try {
    // Fetch account data from the API endpoint
    accountsData = await fetchAccountsData();
  } catch (error) {
    console.log("Error:", error);
    // If an error occurs, initialize data with an empty array
    accountsData = [];
  }

  // Return the data as props to the Home component
  return {
    props: {
      accounts: accountsData,
    },
  };
};