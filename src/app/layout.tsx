import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EstateLeads AI — Never lose a property enquiry again",
  description:
    "AI follow-up assistant for estate agencies. Draft replies, schedule follow-ups, and keep every lead moving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[15px]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
