import { Geist, Geist_Mono } from "next/font/google"

import "@sst-web-portfolio/ui/globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/general/Navbar"

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
