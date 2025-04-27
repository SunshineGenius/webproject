'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { addToCart } from '@/lib/cart' //  引入加入购物车方法
import { toast } from 'sonner'         //  引入提示弹窗

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  image?: {
    url: string
  }
  price?: number
  currency?: string
  weightOrVolume?: string
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

  // 加入购物车逻辑
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

    toast.success('已加入购物车！') //  添加成功提示
  }

  return (
    <div className="p-8 relative">
      {/* 返回首页 */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-green-700 hover:underline"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-green-700 mb-6 mt-12">
        Category：{decodeURIComponent(slug)}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">There are currently no products in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-md transition flex flex-col justify-between"
            >
              {/* 图片和文字点击跳转 */}
              <Link href={`/product/${product.slug}`} className="flex-1">
                {product.image?.url && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                )}

                <h2 className="text-lg font-semibold">{product.name}</h2>

                {product.price !== undefined && (
                  <p className="text-green-700 font-semibold mt-1">
                    {product.price} {product.currency || ''}
                  </p>
                )}

                {product.weightOrVolume && (
                  <p className="text-sm text-gray-600">{product.weightOrVolume}</p>
                )}

                {product.description && (
                  <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                )}
              </Link>

              {/* 加入购物车按钮 */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  add to the cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
