// src/app/product/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/AddToCartButton'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  currency: string
  weightOrVolume?: string
  description?: string
  image?: {
    url: string
  }
  category?: {
    slug?: string
    name?: string
  }
}

interface ProductPageProps {
  params: { slug: string }
}

//  静态路径预生成
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=1000`,
      { next: { revalidate: 60 } }
    )
    const data = await res.json()
    return data.docs.map((product: Product) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error('生成静态路径失败:', error)
    return []
  }
}

// 主页面组件：注意加了 async
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params  //  解构 slug，规范用法

  if (!slug) return notFound()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`,
      { cache: 'no-store' }
    )

    if (!res.ok) return notFound()

    const data = await res.json()
    const product: Product = data.docs?.[0]

    if (!product) return notFound()

    const categorySlug = product.category?.slug
      || product.category?.name?.toLowerCase()?.replace(/\s+/g, '-')
      || ''

    return (
      <div className="max-w-5xl mx-auto px-6 py-10 relative">
        {/* 返回分类页 */}
        {categorySlug && (
          <Link
            href={`/category/${categorySlug}`}
            className="absolute top-6 left-6 text-green-700 hover:underline"
          >
            ← Return to previous page
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {product.image?.url && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
              alt={product.name}
              className="w-full h-auto object-contain rounded border"
              loading="lazy"
              width={600}
              height={400}
            />
          )}

          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{product.name}</h1>

              <p className="text-xl text-green-800 font-semibold mt-4">
                {product.price.toLocaleString()} {product.currency}
              </p>

              {product.weightOrVolume && (
                <p className="text-md text-gray-600 mt-1">
                  Capacity/Weight：{product.weightOrVolume}
                </p>
              )}

              {product.description && (
                <div
                  className="mt-6 text-gray-700 leading-relaxed prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>

            {/* 加入购物车按钮 */}
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                currency: product.currency,
                imageUrl: product.image?.url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`
                  : undefined,
              }}
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('商品加载失败:', error)
    return notFound()
  }
}
