import { CollectionConfig } from 'payload/types'

const Customers: CollectionConfig = {
  slug: 'customers',
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'name', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'phone', type: 'text' },
  ],
}

export default Customers
