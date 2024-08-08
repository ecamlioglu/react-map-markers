'use client'
import React from 'react'
import Navbar from './components/Navbar'
import { fonts } from './fonts'
import { Providers } from './providers'
import dynamic from 'next/dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.poppins.className}>
      <body style={{
        'maxHeight': '100vh',
      }}>
          <Navbar/>
          <Providers>{children}</Providers>
      </body>
    </html>
  )
}