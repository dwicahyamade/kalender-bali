"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Calendar as CalendarIcon, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { getBalineseDate } from "@/lib/bali-phala/engine";
import { useEffect, useState } from "react";

export default function Home() {
  const [today, setToday] = useState<any>(null);
  const [tomorrow, setTomorrow] = useState<any>(null);
  const [monthHolidays, setMonthHolidays] = useState<{day: number, name: string, type: string, dateStr: string}[]>([]);
  const [currentMonthName, setCurrentMonthName] = useState("");

  useEffect(() => {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    setToday(getBalineseDate(todayDate));
    setTomorrow(getBalineseDate(tomorrowDate));

    setCurrentMonthName(todayDate.toLocaleString("id-ID", { month: "long", year: "numeric" }));

    const year = todayDate.getFullYear();
    const month = todayDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const holidays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const bali = getBalineseDate(d);
      if (bali.holiday) {
        holidays.push({ 
          day: i, 
          name: bali.holiday, 
          type: 'Holiday', 
          dateStr: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) 
        });
      }
    }
    setMonthHolidays(holidays);
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

        <h2 className="text-4xl font-bold font-outfit mb-2 leading-tight">{today.saptawara} {today.pancawara}</h2>
        <div className="flex items-center gap-3 mb-4">
          <p className="text-xl text-foreground font-bold font-outfit uppercase tracking-wider underline decoration-accent-gold/40 underline-offset-8">Wuku {today.wuku}</p>
          <div className="h-1 w-1 rounded-full bg-foreground/20" />
          <p className="text-sm text-accent-gold font-bold">{today.sasih}</p>
        </div>
        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{today.dateMasehi} • Tahun Saka {today.yearSaka}</p>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-xl font-outfit text-foreground">Rahinan Bulan Ini</h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-gold/50">{currentMonthName}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-accent-gold">
              <CalendarIcon size={20} />
            </div>
          </div>

          <div className="space-y-6">
            {/* Mendatang Section */}
            {monthHolidays.filter(h => h.day >= new Date().getDate()).length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 px-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Mendatang
                </p>
                <div className="grid gap-2 outline-none">
                  {monthHolidays
                    .filter(h => h.day >= new Date().getDate())
                    .map((h, i) => (
                      <motion.div 
                        key={`up-${i}`}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/[0.07] hover:border-accent-gold/20 transition-all group"
                      >
                        <div className="flex flex-col items-center justify-center min-w-[48px] h-12 rounded-xl bg-foreground/5 border border-foreground/5 group-hover:bg-accent-gold/10 transition-colors">
                          <span className="text-[9px] font-bold text-foreground/30 uppercase leading-none mb-1 group-hover:text-accent-gold/50">Tgl</span>
                          <span className="text-base font-bold font-outfit leading-none">{h.day}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-accent-gold transition-colors">{h.name}</h4>
                          <p className="text-[10px] text-foreground/40 font-medium">Bulan {currentMonthName.split(' ')[0]}</p>
                        </div>
                        <ArrowRight size={14} className="text-foreground/10 group-hover:text-accent-gold/40 transition-colors" />
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* Sudah Lewat Section */}
            {monthHolidays.filter(h => h.day < new Date().getDate()).length > 0 && (
              <div className="space-y-3 opacity-50">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Sudah Lewat</p>
                <div className="grid gap-2">
                  {monthHolidays
                    .filter(h => h.day < new Date().getDate())
                    .map((h, i) => (
                      <div key={`past-${i}`} className="flex items-center gap-4 p-3 rounded-2xl bg-foreground/5 border border-foreground/5">
                        <div className="flex flex-col items-center justify-center min-w-[40px] h-10 rounded-lg bg-white/5 grayscale">
                          <span className="text-sm font-bold font-outfit">{h.day}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-foreground/60 line-through decoration-white/20">{h.name}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {monthHolidays.length === 0 && (
              <div className="text-center py-10 px-6 border border-dashed border-foreground/10 rounded-3xl">
                <p className="text-sm text-foreground/30 font-medium italic">Tidak ada rahinan di bulan ini.</p>
              </div>
            )}
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
