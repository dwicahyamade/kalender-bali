"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Calendar as CalendarIcon, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { getBalineseDate } from "@/lib/bali-phala/engine";
import { useEffect, useState } from "react";

export default function Home() {
  const [today, setToday] = useState<any>(null);
  const [tomorrow, setTomorrow] = useState<any>(null);

  useEffect(() => {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    setToday(getBalineseDate(todayDate));
    setTomorrow(getBalineseDate(tomorrowDate));
  }, []);

  if (!today || !tomorrow) return null;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col gap-6">
      {/* Today's Date Card */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 blur-3xl -z-10 group-hover:bg-accent-gold/20 transition-colors" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="bg-accent-gold/10 text-accent-gold text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            Hari Ini
          </div>
          <button className="text-foreground/30 hover:text-foreground/60 transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        <h2 className="text-4xl font-bold font-outfit mb-2">{today.saptawara}, {today.pancawara}</h2>
        <p className="text-xl text-foreground font-medium mb-1 underline decoration-accent-gold/30 underline-offset-4">Wuku {today.wuku}</p>
        <p className="text-sm text-foreground/50 font-medium">{today.dateMasehi} • Tahun Saka {today.yearSaka}</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-foreground/5 p-4 rounded-2xl">
            <p className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Tri Wara</p>
            <p className="font-bold text-lg">{today.triwara}</p>
          </div>
          <div className="bg-foreground/5 p-4 rounded-2xl">
            <p className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Sad Wara</p>
            <p className="font-bold text-lg">{today.sadwara}</p>
          </div>
          <div className="bg-foreground/5 p-4 rounded-2xl">
            <p className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Eka Wara</p>
            <p className="font-bold text-lg">{today.ekawara}</p>
          </div>
          <div className="bg-foreground/5 p-4 rounded-2xl">
            <p className="text-[10px] uppercase font-bold text-foreground/40 mb-1">Dasa Wara</p>
            <p className="font-bold text-lg">{today.dasawara}</p>
          </div>
        </div>
      </motion.section>

      {/* Tomorrow Banner */}
      <AnimatePresence>
        {tomorrow?.holiday && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-accent-crimson/5 border border-accent-crimson/10 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-crimson rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-accent-crimson/80">Besok: Hari Raya {tomorrow.holiday}</p>
            </div>
            <ArrowRight size={16} className="text-accent-crimson/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        <motion.div variants={item}>
          <Link href="/finder">
            <div className="glass-card p-6 rounded-3xl hover-lift flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Search size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Cari Hari</h3>
                <p className="text-[10px] text-foreground/50">Temukan dewasa ayu</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/converter">
            <div className="glass-card p-6 rounded-3xl hover-lift flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Otonan</h3>
                <p className="text-[10px] text-foreground/50">Cek hari lahir Bali</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Ad Slot Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 border-t border-dashed border-foreground/10 pt-6"
      >
        <div className="w-full h-24 bg-foreground/5 rounded-2xl border border-foreground/5 flex items-center justify-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/20">Advertisement Slot</span>
        </div>
      </motion.div>
    </div>
  );
}
