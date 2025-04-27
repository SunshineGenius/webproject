'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCartItems } from '@/lib/cart'

export default function Navbar() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const items = getCartItems()
    const total = items.reduce((sum, item) => sum + item.quantity, 0)
    setCount(total)
  }, [])

  return (
    <nav className="flex justify-end items-center p-4 shadow">
      <Link href="/cart" className="relative">
        🛒
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
            {count}
          </span>
        )}
      </Link>
    </nav>
  )
}
