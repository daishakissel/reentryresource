import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-ocean-deeper py-4 px-4">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/privacy" className="hover:text-brand-gold transition-colors">
          Privacy
        </Link>
        <span>|</span>
        <span>&copy; {new Date().getFullYear()} Reentry Resource - All rights reserved</span>
        <span>|</span>
        <Link href="/terms" className="hover:text-brand-gold transition-colors">
          Terms
        </Link>
      </div>
    </footer>
  );
}
