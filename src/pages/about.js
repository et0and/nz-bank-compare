import { useState } from "react";
import Meta from "@/components/Meta";
import Nav from "@/components/Nav";
import Link from "next/link";

const About = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-24 py-8 md:py-24">
      <Meta />
      <nav className="flex justify-between items-center mb-12">
        <button className="md:hidden text-2xl no-underline hover:underline" onClick={() => setMenuOpen(!menuOpen)}>
          Menu
        </button>
        <Link href="/">
        <h1 className="text-2xl font-bold text-black dark:text-white hidden md:block no-underline hover:underline">Rates Radar</h1>
        </Link>
        <div className="space-x-4 hidden md:flex">
          <Nav />
        </div>
      </nav>
      {menuOpen && (
        <div className="flex flex-col space-y-2 mb-12 md:hidden">
          <Nav />
        </div>
      )}
      <h1 className="text-2xl text-center font-bold text-black dark:text-white mb-4">About Us</h1>
      <p className="my-8 mx-auto md:w-2/3 lg:w-1/2 text-black dark:text-white">Welcome to Rates Radar, your definitive resource for comparing savings rates across all financial institutions in Aotearoa New Zealand. Our mission is to help you navigate the complexities of savings rates, ensuring you&#39;re equipped with accurate, up-to-date information to make informed decisions about your finances.</p>
      <p className="my-8 mx-auto md:w-2/3 lg:w-1/2 text-black dark:text-white">Developed and maintained by Jonathon Toon and Tom Hackshaw.</p>
    </div>
  );
};

export default About;
