import Link from "next/link";

export default function Nav() {
  return (
    <>
      <Link legacyBehavior href="/">
        <a className="no-underline hover:underline text-black dark:text-white">Browse</a>
      </Link>
      <Link legacyBehavior href="/blog">
        <a className="no-underline hover:underline text-black dark:text-white">Blog</a>
      </Link>
      <Link legacyBehavior href="/about">
        <a className="no-underline hover:underline text-black dark:text-white">About</a>
      </Link>
      <Link legacyBehavior href="/contact">
        <a className="no-underline hover:underline text-black dark:text-white">Contact</a>
      </Link>
    </>
  );
}
