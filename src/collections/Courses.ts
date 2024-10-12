import { isAdmin } from '../access/isAdmin';
import { CollectionConfig } from 'payload';
const Courses:CollectionConfig = {
  slug: 'courses',
  access:{
    read : ()=>true,
    create:isAdmin,
    update:isAdmin,
    delete:isAdmin
  },
  fields: [
    {
      name : 'image',
      type : 'upload',
      required : true,
      relationTo : 'media'
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDesc',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'discount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'pre_requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },
    {
      name: 'learnings',
      type: 'array',
      fields: [
        {
          name: 'learning',
          type: 'text',
        },
      ],
    },
    {
      name: 'contents',
      type: 'relationship',
      relationTo: 'contents',
      hasMany: true,
    },
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
    },
  ],
};

export default Courses;
