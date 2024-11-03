
import { isAdminOrMentor } from '../access/isCombination';
import { CollectionConfig } from 'payload/types';

const Tasks:CollectionConfig = {
    slug: 'tasks',
    access:{
      create:isAdminOrMentor,
      update:isAdminOrMentor,
      delete:isAdminOrMentor,
    },
    fields: [
      {
        name:'title',
        type: 'text',
        defaultValue: 'Task'
      },
      {
        name: 'Problems',
        type: 'array',
        fields: [
          {
            name: 'question',
            type: 'richText',
            required: true,
            admin: {
              description: 'Enter the question content here.',
            },
          },
          {
            name: 'image_url',
            type: 'relationship',
            relationTo:'media'
          },
          {
            name: 'point',
            type: 'number',
          },
        ],
      },
      {
        name: 'MCQs',
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
            type: 'text',
          },
          {
            name: 'image',
            type: 'upload',
            relationTo:"media",
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
  };
  
  export default Tasks;
  