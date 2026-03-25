"use client";

import { motion } from "framer-motion";
import { Search, Heart, Home, Store, Flower2, Share2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { findDewasaAyu } from "@/lib/bali-phala/engine";

const categories = [
  { id: "nikah", label: "Pernikahan", desc: "Hari baik pawiwahan", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "rumah", label: "Membangun", desc: "Pondasi, renovasi, tembok", icon: Home, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: "dagang", label: "Buka Usaha", desc: "Mulai dagang / bisnis", icon: Store, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "karya", label: "Upacara", desc: "Yadnya / syukuran / karya", icon: Flower2, color: "text-purple-400", bg: "bg-purple-400/10" },
];

export default function FinderPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (selected) {
      const now = new Date();
      const res = findDewasaAyu(now.getMonth(), now.getFullYear(), selected);
      setResults(res);
    }
  }, [selected]);

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
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold font-outfit mb-2">Cari Hari Baik</h2>
        <p className="text-sm text-foreground/50 tracking-wide font-medium">Pilih kategori untuk menemukan dewasa ayu bulan ini</p>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.id;

          return (
            <motion.div
              key={cat.id}
              variants={item}
              onClick={() => setSelected(cat.id)}
              className={`glass-card p-5 rounded-3xl cursor-pointer transition-all duration-500 relative overflow-hidden group ${
                isSelected ? "ring-2 ring-accent-gold shadow-[0_0_20px_rgba(250,212,130,0.1)]" : "hover:border-foreground/20"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2" />
              )}
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${isSelected ? 'bg-accent-gold text-black' : `${cat.bg} ${cat.color}`} flex items-center justify-center transition-colors duration-500 shadow-lg`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-foreground mb-0.5">{cat.label}</h3>
                  <p className="text-[10px] text-foreground/40 font-medium leading-tight">{cat.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mt-2"
        >
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-accent-gold/40">Hasil Pencarian</h4>
            <div className="px-2 py-0.5 rounded-full bg-foreground/5 text-[10px] text-foreground/40 font-bold border border-foreground/5">
              {results.length} Hari Ditemukan
            </div>
          </div>
          
          <div className="space-y-4">
            {results.map((res: any) => (
              <motion.div 
                key={res.day}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-5 rounded-[2rem] border border-foreground/5 flex items-center justify-between group hover:border-accent-gold/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex gap-5 items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-foreground/5 flex flex-col items-center justify-center border border-foreground/5 group-hover:bg-accent-gold/10 group-hover:border-accent-gold/20 transition-colors`}>
                    <span className="text-[10px] uppercase font-bold text-foreground/30 group-hover:text-accent-gold/50">Tgl</span>
                    <span className="text-xl font-bold font-outfit">{res.day}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold font-outfit text-foreground">{res.info}</p>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                        res.quality === "Sangat Baik" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                      }`}>
                        {res.quality}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground/50 font-medium italic">Berdasarkan {res.reason}</p>
                  </div>
                </div>
                <button className="p-3 rounded-full bg-foreground/5 text-foreground/20 group-hover:bg-accent-gold/10 group-hover:text-accent-gold transition-all duration-500">
                  <Share2 size={16} />
                </button>
              </motion.div>
            ))}
            {results.length === 0 && (
              <div className="text-center py-12 px-6 glass-card rounded-[2rem] border-dashed border-foreground/10">
                <p className="text-sm text-foreground/30 font-medium italic">Tidak ada dewasa ayu ditemukan bulan ini untuk kategori tersebut.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
