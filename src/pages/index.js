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
      {data ? (
        <div className="grid grid-cols-3 gap-4">
          {data.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              {Object.entries(account).map(([key, value]) => (
                <p
                  key={key}
                  className={`text-gray-500 mb-2 ${
                    key === "total_interest" ? "text-2xl font-bold" : ""
                  }`}
                >
                  {key}: {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};