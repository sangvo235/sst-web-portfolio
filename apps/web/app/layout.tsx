import { Geist, Geist_Mono } from "next/font/google"

import "@sst-web-portfolio/ui/globals.css"
import { Providers } from "@/components/providers"
import Navbar from '@/components/general/Navbar';
import { AuthProvider } from '@/components/general/AuthProvider';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
          <Providers>
            <Navbar user={user} />
            <main className="pt-4">
              <div className="max-w-7xl mx-auto mt-8 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </Providers>
        </body>
      </html>
    </AuthProvider>
  )
}