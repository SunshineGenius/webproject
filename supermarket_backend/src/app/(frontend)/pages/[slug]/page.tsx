// src/app/pages/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

// 手动渲染 Lexical 富文本 JSON 为 HTML 字符串
function renderLexicalContent(lexical: any): string {
  if (!lexical?.root?.children) return ''

  return lexical.root.children
    .map((paragraph: any) => {
      if (!paragraph?.children) return ''
      const text = paragraph.children.map((node: any) => node.text || '').join('')
      return `<p>${text}</p>`
    })
    .join('')
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return pages.docs.map((page: any) => ({ slug: page.slug }))
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const { slug } = await paramsPromise
  const page = await queryPageBySlug({ slug })

  if (!page) return notFound()

  // 使用手动函数生成 HTML
  const html = renderLexicalContent(page.content)

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{page.title}</h1>

      {/* 渲染后台富文本内容 */}
      <div
        className="content text-gray-700 leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* 如果是 about 页面，加地图 */}
      {slug === 'about' && (
        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.1524363421377!2d19.0699777!3d47.4869437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dd202aede6bf%3A0x2fb73f255f9fbd6!2z5Lic5pa56aOf5ZOBIERvbmcgRmFuZyBGb29k!5e0!3m2!1szh-CN!2shu!4v1745861678977!5m2!1szh-CN!2shu"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </main>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
