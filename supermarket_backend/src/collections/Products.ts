import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // 允许匿名读取
  },
  fields: [
    //  产品名称
    { name: 'name', type: 'text', required: true },

    //  产品 slug，用于生成详情页链接
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: '商品条形码',
      },
    },

    //  售价
    { name: 'price', type: 'number', required: true },

    // 货币单位
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

    //  克重 / 容量
    {
      name: 'weightOrVolume',
      type: 'text',
      label: 'Weight / Volume',
      required: false,
      admin: {
        placeholder: '例如：500g 或 750ml',
      },
    },

    // 库存
    { name: 'stock', type: 'number', required: true },

    //  产品描述
    { name: 'description', type: 'textarea' },

    // 所属分类
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },

    //  所属品牌
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },

    // 产品图片
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },

    // 是否为首页推荐产品
    { name: 'isFeatured', type: 'checkbox' },
  ],
}

export default Products
