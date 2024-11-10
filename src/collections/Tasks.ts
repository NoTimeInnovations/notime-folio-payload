import { isAdminOrMentor, isAdminOrMentorFieldLevel } from '../access/isCombination'
import { CollectionConfig } from 'payload'

const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    read: () => true,
    create: isAdminOrMentor,
    update: isAdminOrMentor,
    delete: isAdminOrMentor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Task',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'problems',
      type: 'array',
      fields: [
        
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'question',
          type: 'richText',
          required: true,
          admin: {
            description: 'Enter the question content here.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'point',
          type: 'number',
        },
      ],
    },
    {
      name: 'mcqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'textarea',
        },
        {
          name: 'options',
          type: 'array',
          fields: [
            {
              name: 'option',
              type: 'text',
            },
          ],
        },
        {
          name: 'answer',
          label : 'Answer Index',
          type: 'number',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'point',
          type: 'number',
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
}

export default Tasks
