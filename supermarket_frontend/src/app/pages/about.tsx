'use client';

import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function fetchPageContent() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=about`
        );
        const data = await response.json();
        const page = data.docs?.[0];

        if (page) {
          setContent(page.content);  // 设置富文本内容
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      }
    }

    fetchPageContent();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">关于我们</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}  // 渲染富文本内容
      />
    </div>
  );
}
