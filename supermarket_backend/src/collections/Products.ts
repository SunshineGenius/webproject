import { CollectionConfig } from 'payload/types'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // 允许匿名读取
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'price', type: 'number', required: true },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'HUF',
      options: [
        { label: 'HUF', value: 'HUF' },
        { label: 'EUR', value: 'EUR' },
        { label: 'CNY', value: 'CNY' },
        { label: 'USD', value: 'USD' },
      ],
    },
    {
      name: 'weightOrVolume',
      type: 'text',
      label: 'Weight / Volume',
      required: false,
      admin: {
        placeholder: '例如：500g 或 750ml',
      },
    },
    { name: 'stock', type: 'number', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'isFeatured', type: 'checkbox' },
  ],
}

export default Products
