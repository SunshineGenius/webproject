import Link from 'next/link'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  currency: string
  image?: {
    url: string
  }
}

interface SearchPageProps {
  params: { keyword: string }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const keyword = decodeURIComponent(params.keyword || '').trim()

  if (!keyword) {
    // 搜索词为空，提示用户输入
    return (
      <div className="p-8">
        <Link href="/" className="text-green-700 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-green-700 mb-6">
        Please enter the full or partial name of the product
        </h1>
      </div>
    )
  }

  // 搜索词不为空，去请求 API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?where[name][contains]=${keyword}`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('搜索失败')
  }

  const data = await res.json()
  const products: Product[] = data.docs || []

  return (
    <div className="p-8">
      <Link href="/" className="text-green-700 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-green-700 mb-6">
      Search Results：「{keyword}」
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No related products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <div className="border p-4 rounded shadow hover:shadow-md transition hover:cursor-pointer flex flex-col justify-between h-full">
                {product.image?.url && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                )}
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-700 font-semibold mt-1">
                  {product.price?.toLocaleString()} {product.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
