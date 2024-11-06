import payload, { PayloadHandler } from 'payload';
import { isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload';
import { read } from 'fs';
import { isAdminOrStudent } from '@/access/isCombination';
const Comments = {
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
        defaultValue:({ user }) => `${user.id}`,
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
        defaultValue:({ user }) => `${user.name}`,
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
    endpoints: [
      {
          path: '/comments/:id',
          method: 'post',
          handler: handlerFunction,
      }
  ],
  };
  
  export default Comments;
  


  async function handlerFunction (req , res ){
    const { id } = req.params;
    const { user, body } = req;
    try {
      const newComment = await payload.create({
        collection: 'comments',
        data: {
          user_id: user.id,
          user_name: user.name,
          content: body.content,
        },
      });
      const content = await payload.findByID({
        collection: 'contents',
        id,
      });

      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      const updatedContent = await payload.update({
        collection: 'contents',
        id,
        data: {
          comments: [ ...(content.comments || []), newComment.id],
        },
      });
      return res.status(200).json({ content: updatedContent });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Error adding comment' });
    }
  } 