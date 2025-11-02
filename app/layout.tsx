import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepairLoader - Coming Soon",
  description: "RepairLoader.net is currently under construction. Check back soon!",
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
