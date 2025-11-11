import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { I18nProvider } from "@/components/i18n-provider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "النداء للحج والعمرة",
  description: "النداء للحج والعمرة | اجمع شوق قلبك لعناق الحرمين وتعال معنا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} antialiased font-cairo overflow-x-hidden`}
      >
        <I18nProvider>
          <Navigation />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
