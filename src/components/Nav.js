import Link from "next/link";

export default function Nav() {
  return (
    <>
      <Link legacyBehavior href="/browse">
        <a className="no-underline hover:underline text-white">Browse</a>
      </Link>
      <Link legacyBehavior href="/blog">
        <a className="no-underline hover:underline text-white">Blog</a>
      </Link>
      <Link legacyBehavior href="/about">
        <a className="no-underline hover:underline text-white">About</a>
      </Link>
      <Link legacyBehavior href="/contact">
        <a className="no-underline hover:underline text-white">Contact</a>
      </Link>
    </>
  );
}
