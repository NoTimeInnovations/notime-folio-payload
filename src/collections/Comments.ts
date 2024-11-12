import payload, { CollectionConfig, PayloadHandler } from 'payload';
import { isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { isAdminOrStudent } from '@/access/isCombination';
import { User } from '@/payload-types';

const Comments : CollectionConfig = {
    slug: 'comments',
    access:{
      read : isAdminOrStudent,
      create:isAdminOrSelf,
      update:async ({ req, id }) => {
        if (!id) {
          return true
        }
        const comment = await payload.findByID({ collection: 'comments', id });
        return req?.user?.type === 'admin' || comment.user_id === req?.user?.id;
      },
      delete: async ({ req, id }) => {
        if (!id) {
          return true
        }
        const comment = await payload.findByID({ collection: 'comments', id });
        return req?.user?.type === 'admin' || comment.user_id === req?.user?.id;
      }
    },
    fields: [
      {
        name: 'user_id',
        type: 'relationship',
        defaultValue:({ user } : {user : User}) => `${user.id}`,
        access:{
          create:isAdminFieldLevel,
          update:isAdminFieldLevel,
        },
        relationTo: 'users',
        required: true,
      },
      {
        name: 'user_name',
        type: 'text',
        defaultValue:({ user } : {user : User}) => `${user.name}`,
        access:{
          create:isAdminFieldLevel,
          update:isAdminFieldLevel,
        },
        required: true,
      },
      {
        name: 'content',
        type: 'textarea',
        required: true,
      },
    ],
  };
  
  export default Comments;
  
