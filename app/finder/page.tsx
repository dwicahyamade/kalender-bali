"use client";

import { motion } from "framer-motion";
import { Search, Heart, Home, Scissors, Building, Share2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { findDewasaAyu } from "@/lib/bali-phala/engine";

const categories = [
  { id: "nikah", label: "Pernikahan", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "rumah", label: "Bangun Rumah", icon: Building, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "rambut", label: "Potong Rambut", icon: Scissors, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "pindah", label: "Pindah Rumah", icon: Home, color: "text-emerald-500", bg: "bg-emerald-500/10" },
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
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold font-outfit mb-2">Cari Hari Baik</h2>
        <p className="text-sm text-foreground/50 tracking-wide font-medium">Pilih kategori untuk menemukan dewasa ayu</p>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selected === cat.id;

          return (
            <motion.div
              key={cat.id}
              variants={item}
              onClick={() => setSelected(cat.id)}
              className={`glass-card p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                isSelected ? "ring-2 ring-accent-gold scale-[1.02]" : "hover-lift"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-sm tracking-tight">{cat.label}</h3>
            </motion.div>
          );
        })}
      </motion.div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/30">Hasil Pencarian</h4>
            <Info size={16} className="text-foreground/20" />
          </div>
          
          <div className="space-y-3">
            {results.map((res: any) => (
              <div key={res.day} className="glass-card p-5 rounded-[2rem] border border-white/10 flex items-center justify-between group hover:border-accent-gold/30 transition-colors">
                <div>
                  <p className="text-lg font-bold font-outfit">{res.day} {new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</p>
                  <p className="text-xs text-foreground/50 font-medium">{res.info} • {res.quality}</p>
                </div>
                <button className="p-3 rounded-full bg-foreground/5 text-foreground/40 group-hover:bg-accent-gold/10 group-hover:text-accent-gold transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-center text-sm text-foreground/40 py-8">Tidak ada dewasa ayu ditemukan bulan ini.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
