import { CollectionConfig } from 'payload'

const Topic: CollectionConfig = {
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
      hasMany: true,
    },
  ],
  admin: {
    useAsTitle: 'topic',
  },
}

export default Topic;
