'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '@/lib/cart'

interface CartItem {
  id: string
  name: string
  price: number
  currency: string
  imageUrl?: string
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(getCartItems())
  }, [])

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id)
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty < 1) return
    updateCartItemQuantity(id, newQty)
    setItems(getCartItems())
  }

  const handleRemove = (id: string) => {
    removeFromCart(id)
    setItems(getCartItems())
  }

  const handleClear = () => {
    clearCart()
    setItems([])
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 顶部按钮：返回首页 + 返回上一页 */}
      <div className="flex justify-start gap-6 mb-4">
        <Link href="/" className="text-green-700 hover:underline">
          ← Back to Home
        </Link>
        <button
          onClick={() => router.back()}
          className="text-blue-700 hover:underline"
        >
          ← Return to previous page
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">🛒 Show Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your shopping cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 border p-4 rounded">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    {item.price} {item.currency} x {item.quantity}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600 hover:underline"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* 总价 + 清空按钮 */}
          <div className="mt-6 text-right space-y-4">
            <p className="text-lg font-bold">Total Price：{totalPrice.toLocaleString()} HUF</p>
            <button
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Empty Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}
