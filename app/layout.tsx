import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peter Said — Visual Designer",
  description: "Portfolio of Peter Said, visual designer specializing in branding, social media design, and motion graphics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
