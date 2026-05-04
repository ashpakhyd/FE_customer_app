import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/ReduxProvider";
import LoadingProvider from "../components/LoadingProvider";
import FCMProvider from "../components/FCMProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Help App",
  description: "Mobile-first customer management app",
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#fbbf24'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fbbf24" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <LoadingProvider>
            <FCMProvider>
              <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
              {children}
            </FCMProvider>
          </LoadingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
