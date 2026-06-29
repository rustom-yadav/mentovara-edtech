import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/components/providers/StoreProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://mentovara.vercel.app/"),
  title: "Mentovara — Learn, Grow, Succeed",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Standard favicon
      { url: "/favicon.ico?v=2", sizes: "any" }, // Force refresh 
    ],
    apple: [
      { url: "/apple-touch-icon.png" }, // Apple devices 
    ],
  },
  description:
    "Mentovara is a modern EdTech platform where instructors create courses and students learn through structured video content with progress tracking.",
  keywords: ["edtech", "courses", "learning", "mentovara", "online education"],
  verification: {
    google: "05nsT381gB_XfIpgl1CwfoTdRSgjVwLPVoQMuUBYeu0",
  },
  openGraph: {
    title: "Mentovara — Learn, Grow, Succeed",
    description:
      "Mentovara is a modern EdTech platform where instructors create courses and students learn through structured video content with progress tracking.",
    url: "https://mentovara.vercel.app/",
    siteName: "Mentovara",
    images: [
      {
        url: "/temp/logo.png",
        width: 1200,
        height: 630,
        alt: "Mentovara Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

