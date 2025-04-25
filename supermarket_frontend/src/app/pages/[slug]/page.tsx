import { notFound } from 'next/navigation'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  // 向后端 payload 发送请求，查询 slug 对应页面
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${params.slug}`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    console.error('接口返回错误：', res.status)
    return notFound()
  }

  const data = await res.json()
  const page = data.docs?.[0]

  if (!page) return notFound()

  const html = await convertLexicalToHTML(page.content)

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 prose">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
