"use client";

import { Calendar as CalendarIcon, Info } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-accent-gold p-2 rounded-xl text-white shadow-lg shadow-accent-gold/20"
        >
          <CalendarIcon size={20} />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold tracking-tight font-outfit">
            Kalender<span className="text-accent-gold">Bali</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-medium">Digital PWA</p>
        </div>
      </Link>
      
      <Link href="/settings">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
        >
          <Info size={20} className="text-foreground/60" />
        </motion.button>
      </Link>
    </header>
  );
}
