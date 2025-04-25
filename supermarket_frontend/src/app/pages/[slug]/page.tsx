// src/app/pages/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`)
  const data = await res.json()
  return data.docs.map((page: any) => ({ slug: page.slug }))
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${slug}&depth=1`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    console.error('页面加载失败:', res.status)
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
