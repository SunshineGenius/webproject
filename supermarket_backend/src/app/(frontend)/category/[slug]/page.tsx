'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { addToCart } from '@/lib/cart'
import { toast } from 'sonner'

interface Product {
  id: string
  slug: string
  name: string
  description?: string
  price?: number
  currency?: string
  weightOrVolume?: string
  image?: {
    url: string
  }
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!slug) return

    async function fetchProducts() {
      try {
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories?where[slug][equals]=${decodeURIComponent(slug)}`
        )
        const categoryData = await categoryRes.json()
        const category = categoryData.docs?.[0]
        if (!category || !category.id) {
          console.warn('未找到对应分类')
          return
        }

        const productRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[category][equals]=${category.id}&depth=1`
        )
        const productData = await productRes.json()
        setProducts(productData.docs || [])
      } catch (error) {
        console.error('加载产品出错:', error)
      }
    }

    fetchProducts()
  }, [slug])

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

  return (
    <div className="p-8 relative">
      <Link href="/" className="absolute top-6 left-6 text-green-700 hover:underline">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-green-700 mb-6 mt-12">
        Category：{decodeURIComponent(slug)}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">There are currently no products in this category.</p>
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
                {product.price !== undefined && (
                  <p className="text-green-700 font-bold mt-1">
                    {product.price.toLocaleString()} {product.currency}
                  </p>
                )}
                {product.weightOrVolume && (
                  <p className="text-sm text-gray-600">{product.weightOrVolume}</p>
                )}
                {product.description && (
                  <p className="text-xs text-gray-400 mt-1">{product.description}</p>
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
