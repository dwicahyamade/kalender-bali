"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getBalineseDate } from "@/lib/bali-phala/engine";

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [dates, setDates] = useState<any[]>([]);
  const [startOffset, setStartOffset] = useState(0);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    setStartOffset(firstDay);

    const newDates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const bali = getBalineseDate(date);
      return {
        day: i + 1,
        date: date,
        wewaran: bali.pancawara,
        holiday: bali.holiday,
        isHoliday: bali.saptawara === "Redite" || !!bali.holiday,
        isPurnama: bali.isPurnama,
        isTilem: bali.isTilem,
        baliInfo: bali
      };
    });
    setDates(newDates);

    // Set today as default selection if in current month
    const today = new Date();
    if (today.getMonth() === month && today.getFullYear() === year) {
      const todayBali = getBalineseDate(today);
      setSelectedDate({ day: today.getDate(), date: today, baliInfo: todayBali });
    } else {
      setSelectedDate(newDates[0]);
    }
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("id-ID", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-outfit capitalize">{monthName}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-[10px] uppercase font-bold text-foreground/30 text-center py-2">
            {day}
          </div>
        ))}
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`offset-${i}`} className="aspect-square" />
        ))}
        {dates.map((date: any) => {
          const isSelected = selectedDate?.day === date.day;
          return (
            <motion.div
              key={date.day}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(date)}
              className={`aspect-square p-2 rounded-2xl flex flex-col items-center justify-center relative group cursor-pointer transition-all duration-300 ${
                isSelected ? "bg-accent-gold text-black shadow-lg shadow-accent-gold/20" : 
                date.baliInfo.saptawara === "Redite" ? "bg-accent-crimson/5" : "hover:bg-foreground/5"
              }`}
            >
              <span className={`text-sm font-bold ${
                isSelected ? "text-black" : 
                date.baliInfo.saptawara === "Redite" ? "text-accent-crimson" : "text-foreground"
              }`}>
                {date.holiday ? (
                  <>
                    <span className={isSelected ? "text-black" : "text-accent-crimson"}>(</span>
                    {date.day}
                    <span className={isSelected ? "text-black" : "text-accent-crimson"}>)</span>
                  </>
                ) : date.day}
              </span>
              <span className={`text-[8px] uppercase font-medium ${
                isSelected ? "text-black/80" : "text-foreground/40 group-hover:text-foreground/60"
              } transition-colors`}>
                {date.wewaran}
              </span>
              {(date.isPurnama || date.isTilem) && (
                <div className="absolute top-1.5 right-1.5 flex gap-1">
                  {date.isPurnama && (
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-black" : "bg-red-500"}`} />
                  )}
                  {date.isTilem && (
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-black" : "bg-gray-500"}`} />
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Date Detail */}
      <motion.div 
        key={selectedDate?.day}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-6 glass-card rounded-[2rem] border border-foreground/10 relative overflow-hidden"
      >
        {selectedDate ? (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/30 mb-1">Detail Tanggal</p>
                <h3 className="text-xl font-bold font-outfit">
                  {selectedDate.day} {currentDate.toLocaleString("id-ID", { month: "long", year: "numeric" })}
                </h3>
              </div>
            </div>

            {selectedDate.holiday && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-5 bg-gradient-to-br from-accent-gold/20 via-accent-gold/5 to-transparent border border-accent-gold/40 p-5 rounded-2xl relative overflow-hidden shadow-lg shadow-accent-gold/10"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/20 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-crimson/10 blur-[30px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex flex-col items-center justify-center shrink-0 border border-accent-gold/30 backdrop-blur-md shadow-inner">
                    <span className="text-2xl">✨</span>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-accent-gold mb-1 opacity-80">Hari Raya / Rahinan</p>
                    <h4 className="text-xl font-bold font-outfit text-foreground drop-shadow-md leading-tight">{selectedDate.holiday}</h4>
                  </div>
                </div>
              </motion.div>
            )}
            
            {selectedDate.isPurnama && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-5 flex items-center gap-5 bg-gradient-to-br from-slate-800 to-black border border-yellow-500/30 p-5 rounded-2xl relative overflow-hidden shadow-xl"
              >
                {/* Ambient Moon Glow */}
                <div className="absolute top-1/2 right-1/2 w-48 h-48 bg-yellow-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                {/* Purnama Silhouette */}
                <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-200 via-yellow-100 to-white shadow-[0_0_25px_rgba(250,212,130,0.6)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[radial-gradient(ellipse_at_30%_30%,rgba(0,0,0,0)_20%,rgba(0,0,0,0.2)_80%)]" />
                  <div className="absolute top-[20%] right-[30%] w-3 h-3 rounded-full bg-black/10 blur-[1px]" />
                  <div className="absolute bottom-[30%] left-[20%] w-4 h-5 rounded-full bg-black/10 blur-[2px]" />
                </div>
                
                <div className="relative z-10">
                  <p className="text-[10px] border border-yellow-500/50 bg-yellow-500/10 inline-block px-2 py-0.5 rounded-full uppercase font-bold tracking-widest text-yellow-300 mb-2">Fase Bulan</p>
                  <h4 className="text-2xl font-bold font-outfit text-white drop-shadow-sm leading-none">Purnama</h4>
                </div>
              </motion.div>
            )}

            {selectedDate.isTilem && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="my-5 flex items-center gap-5 bg-gradient-to-br from-gray-900 to-black border border-gray-700 p-5 rounded-2xl relative overflow-hidden shadow-xl"
              >
                {/* Subtle dark aura */}
                <div className="absolute top-1/2 right-0 w-48 h-48 bg-gray-800/20 blur-[40px] rounded-full translate-x-1/4 -translate-y-1/2 pointer-events-none" />
                
                {/* Tilem Silhouette (New Moon with slight corona ring) */}
                <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-[#0a0a0a] shadow-[inset_0_-2px_10px_rgba(255,255,255,0.05),0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center border-[0.5px] border-gray-600/50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full rounded-full bg-gradient-to-bl from-white/10 to-transparent opacity-50" />
                </div>
                
                <div className="relative z-10">
                  <p className="text-[10px] border border-gray-500/50 bg-gray-500/10 inline-block px-2 py-0.5 rounded-full uppercase font-bold tracking-widest text-gray-400 mb-2">Fase Bulan</p>
                  <h4 className="text-2xl font-bold font-outfit text-white drop-shadow-sm leading-none">Tilem</h4>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Sasih & Hari</p>
                <p className="text-sm font-bold text-accent-gold">{selectedDate.baliInfo.sasih}</p>
                <p className="text-[10px] text-foreground/60">{selectedDate.baliInfo.sasihDay}</p>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Wuku</p>
                <p className="text-sm font-bold">{selectedDate.baliInfo.wuku}</p>
                <p className="text-[10px] text-foreground/60">Tahun Saka {selectedDate.baliInfo.yearSaka}</p>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">2 & 5 Wara</p>
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-bold">{selectedDate.baliInfo.saptawara}</p>
                  <p className="text-[10px] text-foreground/40 font-bold">•</p>
                  <p className="text-sm font-bold">{selectedDate.baliInfo.pancawara}</p>
                </div>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Catur & Asta</p>
                <div className="flex gap-2 items-center">
                  <p className="text-xs font-bold">{selectedDate.baliInfo.caturwara}</p>
                  <p className="text-[10px] text-foreground/40 font-bold">•</p>
                  <p className="text-xs font-bold">{selectedDate.baliInfo.astawara}</p>
                </div>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Tri & Sad</p>
                <div className="flex gap-2 items-center">
                  <p className="text-xs font-bold">{selectedDate.baliInfo.triwara}</p>
                  <p className="text-[10px] text-foreground/40 font-bold">•</p>
                  <p className="text-xs font-bold">{selectedDate.baliInfo.sadwara}</p>
                </div>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-foreground/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Ekawara & Dwi</p>
                <div className="flex gap-2 items-center">
                  <p className="text-xs font-bold">{selectedDate.baliInfo.ekawara}</p>
                  <p className="text-[10px] text-foreground/40 font-bold">•</p>
                  <p className="text-xs font-bold">{selectedDate.baliInfo.dwiwara}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-foreground/5">
              <p className="text-[11px] text-foreground/50 font-medium leading-relaxed italic">
                {selectedDate.holiday ? `Hari ini adalah ${selectedDate.holiday}. ` : ""}
                Bertepatan dengan Sasih {selectedDate.baliInfo.sasih} ({selectedDate.baliInfo.sasihDay}), 
                Wuku {selectedDate.baliInfo.wuku}, {selectedDate.baliInfo.saptawara} {selectedDate.baliInfo.pancawara}.
              </p>
            </div>
          </>
        ) : (
          <p className="text-foreground/30 italic text-center text-sm py-4">Pilih tanggal untuk melihat detail</p>
        )}
      </motion.div>
    </div>
  );
}
