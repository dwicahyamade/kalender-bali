import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cek Otonan & Konversi Tanggal Bali",
  description: "Cari tahu hari Otonan (lahir) Bali Anda, lengkap dengan detail Pancawara, Saptawara, Wuku, dan perhitungan urip.",
  alternates: {
    canonical: `${SITE_URL}/converter`,
  },
  openGraph: {
    title: `Cek Otonan & Konversi Tanggal Bali | ${SITE_NAME}`,
    description: "Cari tahu hari Otonan (lahir) Bali Anda, lengkap dengan detail Pancawara, Saptawara, Wuku, dan perhitungan urip.",
    url: `${SITE_URL}/converter`,
  },
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
