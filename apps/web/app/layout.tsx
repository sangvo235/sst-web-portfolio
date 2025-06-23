import { Geist, Geist_Mono } from "next/font/google"

import "@sst-web-portfolio/ui/globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/general/Navbar"
import { AuthProvider } from '@/components/general/AuthProvider';

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased max-w-7xl mx-auto py-4 pt-20`}
        >
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </AuthProvider>
  )
}