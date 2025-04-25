import { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical' // 关键导入

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(), // 关键设置
    },
  ],
}

export default Pages
