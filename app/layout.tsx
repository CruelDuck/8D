import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 8D generátor – MVP",
  description: "Jednoduchá appka pro testování AI generovaného 8D návrhu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
