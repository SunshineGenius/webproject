'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCartItems, subscribeCartChange } from '@/lib/cart'
import { ShoppingCartIcon } from 'lucide-react'

export default function CartIcon() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    function update() {
      const items = getCartItems()
      const total = items.reduce((sum, item) => sum + item.quantity, 0)
      setCount(total)
    }

    update() // 页面加载时同步一次
    const unsubscribe = subscribeCartChange(update)

    return () => unsubscribe()
  }, [])

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-green-600" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
