import { isAdminOrMentor, isAdminOrStudent } from '@/access/isCombination'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: isAdminOrStudent,
    create: ()=> true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: true,
}
