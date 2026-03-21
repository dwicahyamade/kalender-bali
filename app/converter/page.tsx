"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Share2, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getBalineseDate } from "@/lib/bali-phala/engine";

export default function ConverterPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (birthDate) {
      const date = new Date(birthDate);
      if (!isNaN(date.getTime())) {
        const res = getBalineseDate(date);
        setResult(res);
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [birthDate]);

  const handleShareWhatsApp = () => {
    if (!result) return;
    const text = `Halo! Hasil Cek Otonan saya:
📅 Tanggal: ${result.dateMasehi}
🌙 Sasih: ${result.sasih} (${result.sasihDay})
✨ Otonan: ${result.saptawara} ${result.pancawara}
🌀 Wuku: ${result.wuku}
🏰 Tahun Saka: ${result.yearSaka}

Wewaran Lengkap:
• Caturwara: ${result.caturwara}
• Astawara: ${result.astawara}
• Triwara: ${result.triwara}
• Sadwara: ${result.sadwara}

Cek puniki di aplikasi Kalender Bali Digital!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold font-outfit mb-2">Cek Otonan</h2>
        <p className="text-sm text-foreground/50 tracking-wide font-medium">Konversi tanggal lahir ke Kalender Bali</p>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 rounded-[2.5rem] border border-white/10"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-accent-gold/60 px-2 flex items-center gap-2">
              <CalendarIcon size={12} />
              Tanggal Lahir (Masehi)
            </label>
            <div className="relative group">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-foreground/5 border border-white/5 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold/30 transition-all font-medium appearance-none text-white outline-none"
              />
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-accent-gold/50 transition-colors" size={20} />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-10 space-y-6"
            >
              {/* Highlight Card */}
              <div className="glass-card p-8 rounded-[3rem] border border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full -mr-16 -mt-16 blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-gold/5 rounded-full -ml-12 -mb-12 blur-[40px]" />
                
                <div className="relative text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/15 text-accent-gold text-[10px] font-bold uppercase tracking-widest mb-2 border border-accent-gold/20">
                    Sistem Bali-Phala
                  </div>
                  <h3 className="text-4xl font-black font-outfit text-white drop-shadow-lg tracking-tight">
                    {result.saptawara} {result.pancawara}
                  </h3>
                  <div className="flex flex-col items-center">
                    <p className="text-xl text-foreground/70 font-bold font-outfit uppercase tracking-wider">Wuku {result.wuku}</p>
                    <div className="h-0.5 w-12 bg-accent-gold/30 rounded-full my-3" />
                    <p className="text-sm text-accent-gold font-bold">{result.sasih}</p>
                    <p className="text-[10px] text-foreground/40 font-bold tracking-widest uppercase mt-1">Tahun Saka {result.yearSaka}</p>
                  </div>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Triwara</p>
                  <p className="font-bold text-base text-white">{result.triwara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Sadwara</p>
                  <p className="font-bold text-base text-white">{result.sadwara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Caturwara</p>
                  <p className="font-bold text-base text-white">{result.caturwara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Astawara</p>
                  <p className="font-bold text-base text-white">{result.astawara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Sangawara</p>
                  <p className="font-bold text-base text-white">{result.sangawara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mb-2">Dasawara</p>
                  <p className="font-bold text-base text-white">{result.dasawara}</p>
                </div>
              </div>

              <div className="p-5 rounded-[2rem] bg-foreground/5 border border-white/5">
                 <p className="text-[11px] text-foreground/50 font-medium leading-relaxed italic text-center">
                  "Lahir pada {result.saptawara} {result.pancawara} Wuku {result.wuku}, Bertepatan dengan {result.sasihDay} {result.sasih} Tahun Saka {result.yearSaka}."
                 </p>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-accent-gold text-black font-black py-5 rounded-2xl shadow-[0_10px_20px_rgba(250,212,130,0.15)] transition-all active:scale-95"
              >
                <div className="bg-black/10 p-1 rounded-md">
                   <Share2 size={18} />
                </div>
                Bagikan Hasil Otonan
              </motion.button>
            </motion.div>
          ) : (
             <motion.div 
               key="empty"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="mt-12 py-12 text-center"
             >
                <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                   <CalendarIcon size={24} className="text-foreground/20" />
                </div>
                <p className="text-sm text-foreground/30 font-medium italic px-8 leading-relaxed">Masukkan tanggal lahir untuk mengetahui detail kalender Bali dan Otonan Anda.</p>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
