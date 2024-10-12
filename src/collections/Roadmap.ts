import { isAdminOrMentor } from '../access/isCombination';
import { CollectionConfig } from 'payload';
const Roadmap:CollectionConfig = {
    slug: 'roadmaps',
    access:{
      read : ()=>true,
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
        name: 'Topics',
        required : true,
        type: 'relationship',
        relationTo: 'topics',
        hasMany: true,
      }
    ],
    admin: {
      useAsTitle: 'day',
    },
  };
  
  export default Roadmap;
  