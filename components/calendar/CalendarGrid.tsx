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
                isSelected ? "bg-accent-gold text-white shadow-lg shadow-accent-gold/20" : 
                date.isHoliday ? "bg-accent-crimson/5" : "hover:bg-foreground/5"
              }`}
            >
              <span className={`text-sm font-bold ${
                isSelected ? "text-white" : 
                date.isHoliday ? "text-accent-crimson" : "text-foreground"
              }`}>
                {date.day}
              </span>
              <span className={`text-[8px] uppercase font-medium ${
                isSelected ? "text-white/80" : "text-foreground/40 group-hover:text-foreground/60"
              } transition-colors`}>
                {date.wewaran}
              </span>
              {date.holiday && (
                <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-accent-crimson"}`} />
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
        className="mt-4 p-6 glass-card rounded-[2rem] border border-white/10 relative overflow-hidden"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-5 flex items-center gap-4 bg-gradient-to-br from-accent-crimson/20 to-accent-crimson/5 border border-accent-crimson/30 p-5 rounded-2xl relative overflow-hidden shadow-lg shadow-accent-crimson/10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-crimson/20 blur-[30px] rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent-crimson/20 flex flex-col items-center justify-center shrink-0 border border-accent-crimson/40">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-crimson animate-pulse" />
                </div>
                
                <div className="relative z-10">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-accent-crimson/80 mb-0.5">Hari Raya / Rahinan</p>
                  <h4 className="text-xl font-bold font-outfit text-accent-crimson leading-tight">{selectedDate.holiday}</h4>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-foreground/5 p-3 rounded-xl border border-white/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Wewaran</p>
                <p className="text-sm font-bold">{selectedDate.baliInfo.saptawara}, {selectedDate.baliInfo.pancawara}</p>
              </div>
              <div className="bg-foreground/5 p-3 rounded-xl border border-white/5">
                <p className="text-[9px] uppercase font-bold text-foreground/30 mb-1">Wuku</p>
                <p className="text-sm font-bold">{selectedDate.baliInfo.wuku}</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-xl bg-accent-gold/5 border border-accent-gold/10">
              <p className="text-[9px] uppercase font-bold text-accent-gold/60 mb-1">Saka {selectedDate.baliInfo.yearSaka}</p>
              <p className="text-[11px] text-foreground/70 font-medium leading-relaxed">
                Hari ini adalah {selectedDate.baliInfo.saptawara} {selectedDate.baliInfo.pancawara} {selectedDate.baliInfo.wuku}. 
                {selectedDate.holiday ? ` Bertepatan dengan hari raya ${selectedDate.holiday}.` : ""}
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
