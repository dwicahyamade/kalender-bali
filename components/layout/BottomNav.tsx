"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Search, RefreshCw, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/calendar", icon: Calendar, label: "Kalender" },
  { href: "/finder", icon: Search, label: "Cari" },
  { href: "/converter", icon: RefreshCw, label: "Otonan" },
  { href: "/settings", icon: Settings, label: "Info" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-lg mx-4 mb-4 glass-card rounded-2xl border border-white/10 flex items-center justify-around px-2 py-3 shadow-2xl backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="relative px-4 py-2 flex flex-col items-center gap-1">
              <motion.div
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                className={`${isActive ? "text-accent-gold" : "text-foreground/40"}`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? "text-accent-gold" : "text-foreground/40"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-accent-gold rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
