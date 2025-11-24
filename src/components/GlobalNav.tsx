"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function GlobalNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(pathname !== "/");

  useEffect(() => {
    // On any route *except* "/", always show the menu button
    if (pathname !== "/") {
      setShowMenu(true);
      return;
    }

    // On "/", only show once we've scrolled past MainPage
    const hero = document.getElementById("main-hero");
    if (!hero) {
      setShowMenu(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is NOT in view anymore, show the menu
        setShowMenu(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0, // as soon as it leaves the viewport
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [pathname]);

  // If we shouldn't show the menu yet, render nothing
  if (!showMenu) return null;

  return (
    <>
      {/* Menu button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-40 border border-beige/40 bg-black/50 px-3 py-1 text-xs tracking-[0.25em] uppercase text-beige backdrop-blur-sm hover:bg-beige hover:text-black transition"
      >
        Menu
      </button>

      {/* Dim overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-out panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-black/95 border-l border-beige/20 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between py-8 px-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-articulat-cf text-beige/70 uppercase tracking-[0.2em]">
             Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-beige/60 hover:text-beige"
            >
              Close
            </button>
          </div>

          <nav className="mt-10 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-lg font-miller-banner italic transition ${
                  pathname === item.href
                    ? "text-goldenrod"
                    : "text-beige/80 hover:text-beige"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-[11px] text-beige/40">
            © {new Date().getFullYear()} Evan Burton
          </div>
        </div>
      </aside>
    </>
  );
}
