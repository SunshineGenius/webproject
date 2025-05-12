import Image from 'next/image'
import Link from 'next/link' //  新增导入 Link
import ProductSearch from './ProductSearch' // 搜索栏组件

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Welcome to DongFang Food 东方食品！
      </h1>
      <p className="text-lg text-gray-600">
        Please search above for the item you want, or browse quickly by category.
      </p>
    </div>
  )
}
