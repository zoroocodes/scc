import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FixMyFud - Solana Token Tracker",
  description: "Your Shield Against Rugs. On Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}