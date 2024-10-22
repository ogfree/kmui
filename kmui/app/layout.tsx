import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harmony - Music Streaming App',
  description: 'Stream your favorite music with Harmony',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex h-screen bg-background text-foreground">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                  {children}
                </main>
                <Player />
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}