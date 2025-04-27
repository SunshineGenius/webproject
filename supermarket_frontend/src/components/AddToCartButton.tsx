'use client'

import { addToCart } from '@/lib/cart'

interface Props {
  product: {
    id: string
    slug: string
    name: string
    price: number
    currency: string
    imageUrl?: string
  }
}

export function AddToCartButton({ product }: Props) {
  return (
    <button
      className="mt-8 w-full bg-green-600 text-white py-3 rounded text-lg font-bold hover:bg-green-700 transition"
      onClick={() => {
        addToCart({ ...product, quantity: 1 })
        alert('已加入购物车 ')
      }}
    >
      add to the cart
    </button>
  )
}
