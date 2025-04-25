// app/product/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

// 预生成静态路径
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=1000`,
      { next: { revalidate: 60 } } // 每60秒重新验证静态路径
    )
    const data = await res.json()
    return data.docs.map((product: Product) => ({
      slug: product.slug
    }))
  } catch (error) {
    console.error('生成静态路径失败:', error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 参数校验
  if (!params?.slug) return notFound()

  try {
    // 获取商品数据
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[slug][equals]=${params.slug}&depth=2`,
      { cache: 'no-store' }
    )

    if (!res.ok) return notFound()

    const data = await res.json()
    const product: Product = data.docs?.[0]
    if (!product) return notFound()

    // 安全处理分类slug
    const categorySlug = product.category?.slug 
      || product.category?.name?.toLowerCase()?.replace(/\s+/g, '-') 
      || ''

    return (
      <div className="max-w-5xl mx-auto px-6 py-10 relative">
        {/* 返回按钮 */}
        {categorySlug && (
          <Link
            href={`/category/${categorySlug}`}
            className="absolute top-6 left-6 text-green-700 hover:underline"
            aria-label="返回分类页面"
          >
            ← 返回上一页
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* 商品图片 */}
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

          {/* 商品信息 */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{product.name}</h1>

              <p className="text-xl text-green-800 font-semibold mt-4">
                {product.price.toLocaleString()} {product.currency}
              </p>

              {product.weightOrVolume && (
                <p className="text-md text-gray-600 mt-1">
                  规格：{product.weightOrVolume}
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
            <button 
              className="mt-8 w-full bg-green-600 text-white py-3 rounded text-lg font-bold hover:bg-green-700 transition"
              aria-label="加入购物车"
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('商品加载失败:', error)
    return notFound()
  }
}