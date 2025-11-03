import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepairLoader - Fix Tech Problems, Share Solutions",
  description: "Free diagnostic tools, expert community, and step-by-step guides to solve Windows, Mac, and Linux issues.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
