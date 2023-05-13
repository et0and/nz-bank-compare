import Image from "next/image"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react";

import AccountCard from "@/components/AccountCard";

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/accounts");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data ? (
        <div className="max-w-7xl mx-auto"> {/* This class constrains the width to 62rem */}
          {/* Updated grid-cols classes to be responsive */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((account, index) => (<AccountCard key={index} account={account} />))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};
