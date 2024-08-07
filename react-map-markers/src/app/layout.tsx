import { fonts } from './fonts'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.poppins.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}