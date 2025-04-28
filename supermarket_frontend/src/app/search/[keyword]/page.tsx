'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { addToCart } from '@/lib/cart'
import { toast } from 'sonner'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  currency: string
  weightOrVolume?: string
  image?: {
    url: string
  }
}

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!keyword) return

    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[name][contains]=${decodeURIComponent(keyword)}`,
          { cache: 'no-store' }
        )

        if (!res.ok) throw new Error('搜索失败')

        const data = await res.json()
        setProducts(data.docs || [])
      } catch (error) {
        console.error('搜索出错:', error)
      }
    }

    fetchProducts()
  }, [keyword])

  const handleAddToCart = (product: Product) => {
    if (!product.id || !product.name || !product.price || !product.currency) return

    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      imageUrl: product.image?.url
        ? `${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`
        : undefined,
    })

    toast.success('已加入购物车！')
  }

  if (decodeURIComponent(keyword) === '空') {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
        Please enter the full or partial name of the product
        </h1>
        <Link href="/" className="text-green-500 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-green-700 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-green-700 mb-6">
      Search Results：「{decodeURIComponent(keyword)}」
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No related products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition flex flex-col p-4 h-full"
            >
              <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col items-center">
                {product.image?.url && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                )}
                <h2 className="text-base font-semibold text-center">{product.name}</h2>
                <p className="text-green-700 font-bold mt-1">{product.price?.toLocaleString()} {product.currency}</p>
                {product.weightOrVolume && (
                  <p className="text-sm text-gray-600">{product.weightOrVolume}</p>
                )}
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition"
              >
                add to the cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
