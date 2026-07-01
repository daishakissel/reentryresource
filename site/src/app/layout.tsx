import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ShelterProvider } from "@/context/ShelterContext";
import { MyLocationProvider } from "@/context/MyLocationContext";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reentry Resource",
  description: "Resource directory for homeless services",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-ocean-deeper min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <ShelterProvider>
              <MyLocationProvider>
                <AppShell>{children}</AppShell>
              </MyLocationProvider>
            </ShelterProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
