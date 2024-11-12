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
      required: true,
    },
    {
      name: 'video',
      type: 'upload',
      relationTo : 'media',
      required: true,
    },
    {
      name :'videoThumbnail',
      type : 'upload',
      relationTo : 'media',
      required : true,

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
      name: 'task',
      type: 'relationship',
      relationTo: 'tasks',
    },
  ],
  admin: {
    useAsTitle: 'topic',
  },
}

export default Topic
