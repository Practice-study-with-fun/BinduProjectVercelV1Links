"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center font-poppins text-sm text-gray-300 py-6 border-t border-white/10 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
      © {new Date().getFullYear()} | Made with{" "}
      <span className="text-red-500">❤️</span> &lt;code/&gt; by{" "}
      <Link
        href="https://yourportfolio.com"
        target="_blank"
        className="font-semibold text-teal-400 hover:text-teal-200 transition-colors duration-300"
      >
        Bipul
      </Link>
    </footer>
  );
}
