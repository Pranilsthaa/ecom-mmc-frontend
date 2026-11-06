import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import MotionProvider from "@/components/providers/motion-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemoryFrame | Handcrafted Frames for Your Favorite Memories",
  description:
    "Preserve your favorite photos in handcrafted wood frames. Explore MemoryFrame, our process, and the stories behind every keepsake.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var theme;try{theme=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=theme==='light'||theme==='dark'?theme:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
