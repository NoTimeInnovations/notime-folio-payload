import { isAdminOrMentor } from '../access/isCombination';
import { CollectionConfig } from 'payload';
const Content:CollectionConfig = {
    slug: 'contents',
    access:{
      create:isAdminOrMentor,
      delete:isAdminOrMentor,
      update:isAdminOrMentor
    },
    fields: [
      {
        name: 'day',
        type: 'number',
        required: true,
      },
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
  };
  
  export default Content;
  