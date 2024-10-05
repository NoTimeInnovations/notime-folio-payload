import { isAdmin } from '../access/isAdmin';
import { CollectionConfig } from 'payload/types';
const Badges:CollectionConfig = {
    slug: 'badges',
    access:{
        create:isAdmin,
        update:isAdmin,
        delete:isAdmin,
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'image_url',
        type: 'text',
        required: true,
      },
      {
        name: 'decription',
        type: 'text',
        required: true,
      },
    ],
    admin: {
      useAsTitle: 'name',
    },
  };
  
  export default Badges;
  