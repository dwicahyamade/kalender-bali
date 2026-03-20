"use client";

import { motion } from "framer-motion";
import { Download, Info, Shield, Moon, Sun, Smartphone, Github, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Initialize theme from document class or localStorage
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    console.log("Toggling Dark Mode to:", newMode);
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Aplikasi sudah terinstal, atau browser perangkat Anda belum mendukung otomatisasi ini.");
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto flex flex-col gap-8">
      <header>
        <h2 className="text-3xl font-bold font-outfit mb-2">Informasi</h2>
        <p className="text-sm text-foreground/50 tracking-wide font-medium">Tentang Kalender Bali Digital</p>
      </header>

      {/* PWA Install Promo */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-accent-gold/10 rounded-[2.5rem] p-8 flex flex-col gap-6 border border-accent-gold/10"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-gold rounded-2xl flex items-center justify-center text-white shadow-xl shadow-accent-gold/30">
            <Download size={28} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Pasang Aplikasi</h3>
            <p className="text-xs text-foreground/60 font-medium">Akses offline dan lebih cepat</p>
          </div>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed font-medium">
          Dapatkan pengalaman terbaik dengan menambahkan Kalender Bali ke layar utama ponsel Anda.
        </p>
        <button 
          onClick={handleInstallClick}
          className="bg-accent-gold text-white font-bold py-4 rounded-2xl transition-transform active:scale-95"
        >
          {deferredPrompt ? "Tambah ke Layar Utama" : "Sudah Terinstal / Didukung"}
        </button>
      </motion.div>

      {/* App Stats/Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-6 rounded-3xl flex flex-col gap-2">
          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Versi</p>
          <p className="font-bold font-outfit">1.0.0 (Alpha)</p>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col gap-2 shadow-sm">
          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Update</p>
          <p className="font-bold font-outfit">Maret 2026</p>
        </div>
      </div>

      {/* Sections */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 px-2">Pengaturan</h4>
        <div className="glass-card rounded-3xl divide-y divide-foreground/5 overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40">
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span className="font-bold text-sm tracking-tight">Mode Gelap</span>
            </div>
            <div 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ${
                isDarkMode ? "bg-accent-gold" : "bg-foreground/10"
              }`}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full transition-all" 
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40">
                <Smartphone size={20} />
              </div>
              <span className="font-bold text-sm tracking-tight">Notifikasi</span>
            </div>
            <div className="w-12 h-6 bg-foreground/10 rounded-full relative p-1 cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Credit Footer */}
      <footer className="mt-8 text-center flex flex-col items-center gap-4 opacity-30 grayscale hover:opacity-100 transition-all hover:grayscale-0">
        <div className="flex gap-4">
          <Github size={20} />
          <ExternalLink size={20} />
        </div>
        <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Build with Love for Bali</p>
      </footer>
    </div>
  );
}
