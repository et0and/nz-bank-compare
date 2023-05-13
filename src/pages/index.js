import Image from "next/image"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react";

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
      {data ? JSON.stringify(data, null, 2) : "Loading..."}
    </main>
  );
}
