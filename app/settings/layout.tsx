import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tentang Aplikasi",
  description: "Informasi aplikasi Kalender Bali Digital dan pengaturan mode gelap / notifikasi.",
  alternates: {
    canonical: `${SITE_URL}/settings`,
  },
  openGraph: {
    title: `Tentang Aplikasi | ${SITE_NAME}`,
    description: "Informasi aplikasi Kalender Bali Digital dan pengaturan mode gelap / notifikasi.",
    url: `${SITE_URL}/settings`,
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
