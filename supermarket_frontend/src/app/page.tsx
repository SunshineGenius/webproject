import Image from "next/image";
import Link from "next/link"; //  新增导入 Link
import ProductSearch from './ProductSearch' // 搜索栏组件


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      {/*  Logo 标题部分 */}
      <div className="w-full flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DongFang Food logo"
              width={40}
              height={40}
            />
            <span className="text-green-600 font-bold text-lg">DongFang Food 东方食品</span>
          </div>
        </div>
        {/*  搜索栏 */}
        <ProductSearch />   

        {/*  分类栏（静态展示） */}
        <div className="w-full flex flex-wrap gap-4 justify-center mt-4">
          <Link href="/category/instant-noodles" className="px-4 py-2 border rounded text-green-700 border-green-500 hover:bg-green-100">Instant noodle</Link>
          <Link href="/category/drinks" className="px-4 py-2 border rounded text-green-700 border-green-500 hover:bg-green-100">Drinkg</Link>
          <Link href="/category/seasoning" className="px-4 py-2 border rounded text-green-700 border-green-500 hover:bg-green-100">Seasoning</Link>
          <Link href="/category/snacks" className="px-4 py-2 border rounded text-green-700 border-green-500 hover:bg-green-100">Snake</Link>
        </div>

      </main>
      
    </div>
  );
}
