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
    <div className="max-w-5xl mx-auto p-8">
      {/* 标题 */}
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">About Us</h1>

      {/* 富文本内容 */}
      <div
        className="content text-gray-700 leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Google 地图 */}
      <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
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
    </div>
  );
}
