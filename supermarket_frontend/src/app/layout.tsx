import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { CartProvider } from '@/context/CartContext'
import CartIcon from '@/components/CartIcon'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  title: '东方食品商城',
  description: '用 Payload + Next.js 打造的出海超市系统',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {/* 让 header 固定顶部，背景白色，加阴影，置顶层级 */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-6 py-4 border-b shadow">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <h1 className="text-green-600 text-xl font-bold">DongFang Food 东方食品</h1>
            </Link>
            <CartIcon />
          </header>

          {/* 下面的内容加一个 padding-top，避免被 header 挡住 */}
          <main className="pt-20">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
