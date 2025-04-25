import { CollectionConfig } from 'payload/types'

const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        { name: 'quantity', type: 'number' },
      ],
    },
    { name: 'status', type: 'text', defaultValue: 'pending' },
    { name: 'totalAmount', type: 'number' },
  ],
}

export default Orders
