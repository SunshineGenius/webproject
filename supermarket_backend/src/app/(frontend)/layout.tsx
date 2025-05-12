import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import ProductSearch from './ProductSearch'
import CartIcon from '@/components/CartIcon'

export const metadata = {
  title: 'DongFang Food 东方食品',
  description: '亚洲美食超市，东方食品商城',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        {/* 固定顶部 */}
        <header className="fixed top-0 w-full z-50 bg-white border-b p-4 flex flex-col gap-4">
          {/* 第一行：Logo + 搜索框 + 购物车 */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="text-green-600 font-bold text-lg">DongFang Food 东方食品</span>
            </Link>

            {/* 搜索栏 */}
            <div className="flex-1 flex justify-center">
              <ProductSearch />
            </div>

            {/* 购物车图标 */}
            <CartIcon />
          </div>

          {/* 第二行：分类导航 */}
          <nav className="flex justify-center gap-6 text-sm text-gray-800 mt-2">
            <Link href="/category/instant-noodles" className="hover:text-green-700">
              Instant Noodles
            </Link>
            <Link href="/category/drinks" className="hover:text-green-700">
              Drinks
            </Link>
            <Link href="/category/seasoning" className="hover:text-green-700">
              Seasoning
            </Link>
            <Link href="/category/snacks" className="hover:text-green-700">
              Snacks
            </Link>
            <Link href="/pages/about" className="hover:text-green-700">
              About Us
            </Link>
          </nav>
        </header>

        {/* 内容区域 */}
        <main className="pt-[150px] p-8 min-h-[calc(100vh-150px)]">{children}</main>
      </body>
    </html>
  )
}
