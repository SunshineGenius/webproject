'use client'

import { useState } from 'react'

export default function ProductSearch() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`搜索关键词：${query}`)
    // ✅ 实际使用时在这里调用 API，比如 fetch(`/api/products?search=${query}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
      <input
        type="text"
        placeholder="Search Products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Search
      </button>
    </form>
  )
}
