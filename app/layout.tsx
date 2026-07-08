'use client'

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'سامانه سازماندهی دبیران',
  description: 'سیستم مدرن برای سازماندهی و تخصیص دبیران در مدارس',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
