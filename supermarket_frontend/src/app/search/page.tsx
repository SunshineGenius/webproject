import Link from 'next/link'

export default function EmptySearchPage() {
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
