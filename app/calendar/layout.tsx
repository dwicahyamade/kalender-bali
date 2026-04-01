import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kalender Bali 2026 Lengkap",
  description: "Lihat kalender Bali terlengkap tahun 2026 beserta detail harian seperti wewaran, pancawara, saptawara, dan wuku.",
  alternates: {
    canonical: `${SITE_URL}/calendar`,
  },
  openGraph: {
    title: `Kalender Bali 2026 Lengkap | ${SITE_NAME}`,
    description: "Lihat kalender Bali terlengkap tahun 2026 beserta detail harian seperti wewaran, pancawara, saptawara, dan wuku.",
    url: `${SITE_URL}/calendar`,
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
