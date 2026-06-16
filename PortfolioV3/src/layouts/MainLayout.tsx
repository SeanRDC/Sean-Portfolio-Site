import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* HEADER: Matches the transparent, clean flex layout of the reference */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-10 md:py-10 text-black pointer-events-none">
        {/* LOGO */}
        <a href="/" className="pointer-events-auto font-display text-2xl font-bold tracking-tighter">
          SEAN.
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block pointer-events-auto">
          <ul className="flex items-center gap-10">
            <li>
              <button className="text-sm font-medium uppercase tracking-[0.05em] hover:opacity-50 transition-opacity">Work</button>
            </li>
            <li>
              <button className="text-sm font-medium uppercase tracking-[0.05em] hover:opacity-50 transition-opacity">About</button>
            </li>
            <li>
              <button className="text-sm font-medium uppercase tracking-[0.05em] hover:opacity-50 transition-opacity">Contact</button>
            </li>
          </ul>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden pointer-events-auto flex items-center gap-3 text-sm font-medium uppercase tracking-widest">
          Menu
          {/* Simple hamburger icon */}
          <div className="w-6 flex flex-col gap-1.5">
            <span className="block h-[1px] w-full bg-black"></span>
            <span className="block h-[1px] w-full bg-black"></span>
          </div>
        </button>
      </header>

      {/* PAGE CONTENT */}
      {children}
    </>
  );
}