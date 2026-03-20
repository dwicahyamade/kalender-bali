"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";
import { motion } from "framer-motion";

export default function CalendarPage() {
  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CalendarGrid />
      </motion.div>
    </div>
  );
}
