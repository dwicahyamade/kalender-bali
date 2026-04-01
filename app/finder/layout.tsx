import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cari Dewasa Ayu (Hari Baik)",
  description: "Cari Dewasa Ayu atau hari baik Bali untuk menikah, membangun rumah, buka usaha, hingga upacara Yadnya.",
  alternates: {
    canonical: `${SITE_URL}/finder`,
  },
  openGraph: {
    title: `Cari Dewasa Ayu (Hari Baik) | ${SITE_NAME}`,
    description: "Cari Dewasa Ayu atau hari baik Bali untuk menikah, membangun rumah, buka usaha, hingga upacara Yadnya.",
    url: `${SITE_URL}/finder`,
  },
};

export default function FinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
