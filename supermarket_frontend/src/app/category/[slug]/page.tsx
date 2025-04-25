'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Product {
  id: string
  name: string
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
    console.log('API地址:', process.env.NEXT_PUBLIC_API_URL)
    console.log('slug:', slug)

    if (!slug) return

    async function fetchProducts() {
      try {
        // 获取分类 ID（通过 slug 匹配）
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories?where[slug][equals]=${decodeURIComponent(slug)}`
        )
        const categoryData = await categoryRes.json()
        console.log('分类数据:', categoryData)

        const category = categoryData.docs?.[0]

        if (!category || !category.id) {
          console.warn('未找到对应分类')
          return
        }

        // 获取产品（包含分类 ID）
        const productRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[category][equals]=${category.id}`
        )
        const productData = await productRes.json()
        console.log('产品数据:', productData)

        setProducts(productData.docs || [])
      } catch (error) {
        console.error('加载产品出错:', error)
      }
    }

    fetchProducts()
  }, [slug])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Category：{decodeURIComponent(slug)}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">There are currently no products in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              {product.image?.url && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}

              <h2 className="text-lg font-semibold">{product.name}</h2>

              {/* ✅ 显示价格和货币单位 */}
              {product.price !== undefined && (
                <p className="text-green-700 font-semibold mt-1">
                  {product.price} {product.currency || ''}
                </p>
              )}

              {/*  显示克重 / 容量 */}
              {product.weightOrVolume && (
                <p className="text-sm text-gray-600">{product.weightOrVolume}</p>
              )}

              {/*  产品描述 */}
              {product.description && (
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
