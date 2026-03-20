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
    const text = `Halo! Hasil Cek Otonan saya:\nTanggal: ${result.dateMasehi}\nWewaran: ${result.saptawara} ${result.pancawara}\nWuku: ${result.wuku}\nTahun Saka: ${result.yearSaka}\n\nCek puniki di aplikasi Kalender Bali Digital!`;
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
        className="glass-card p-8 rounded-[2.5rem] border border-white/10"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 px-2">Tanggal Lahir (Masehi)</label>
            <div className="relative">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-foreground/5 border-none rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-accent-gold/30 transition-all font-medium appearance-none"
              />
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={20} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 space-y-6"
            >
              <div className="glass-card p-8 rounded-[3rem] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                
                <div className="relative text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 text-accent-gold text-[10px] font-bold uppercase tracking-widest mb-2">
                    Hasil Otonan
                  </div>
                  <h3 className="text-3xl font-bold font-outfit text-foreground">{result.saptawara} {result.pancawara}</h3>
                  <p className="text-xl text-foreground/70 font-medium">Wuku {result.wuku}</p>
                  <p className="text-sm text-foreground/40 font-medium italic">Tahun Saka {result.yearSaka}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-foreground/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-foreground/30 uppercase mb-1">Tri Wara</p>
                  <p className="font-bold">{result.triwara}</p>
                </div>
                <div className="bg-foreground/5 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-foreground/30 uppercase mb-1">Keterangan</p>
                  <p className="font-bold text-xs">Data dari Bali-Phala</p>
                </div>
              </div>

              <button 
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366]/10 text-[#25D366] font-bold py-4 rounded-2xl border border-[#25D366]/20 transition-all hover:bg-[#25D366]/20 active:scale-95"
              >
                <MessageCircle size={20} />
                Bagikan ke WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
