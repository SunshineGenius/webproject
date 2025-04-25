import { CollectionConfig } from 'payload/types'

const Banners: CollectionConfig = {
  slug: 'banners',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}

export default Banners
