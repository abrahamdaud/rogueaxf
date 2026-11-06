import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ClientShell } from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "RogueAXF — by Rogue ARF",
  description:
    "RogueAXF adalah platform sosial seperti Instagram. Startup by Rogue — ARF.",
  authors: [{ name: "Rogue — ARF" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-black text-white">
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
