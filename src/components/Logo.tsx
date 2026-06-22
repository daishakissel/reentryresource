import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Reentry Resource"
        className="h-24 w-auto"
      />
    </Link>
  );
}
