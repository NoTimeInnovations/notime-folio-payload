import { isAdminOrMentor } from '@/access/isCombination'
import { CollectionConfig } from 'payload'

const Topic: CollectionConfig = {
  access: {
    read: () => true,
    create: isAdminOrMentor,
    delete: isAdminOrMentor,
    update: isAdminOrMentor,
  },
  slug: 'topics',
  fields: [
    {
      name: 'topic',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDesc',
      type: 'textarea',
    },
    {
      name: 'video',
      type: 'text',
    },
    {
      name: 'total_points',
      type: 'number',
      required: true,
    },
    {
      name: 'comments',
      type: 'relationship',
      relationTo: 'comments',
      hasMany: true,
    },
    {
      name: 'tasks',
      type: 'relationship',
      relationTo: 'tasks',
      hasMany: false,
    },
  ],
  admin: {
    useAsTitle: 'topic',
  },
}

export default Topic
