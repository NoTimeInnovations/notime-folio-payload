import payload from 'payload';
import { isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload';
const Comments:CollectionConfig = {
    slug: 'comments',
    access:{
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
        defaultValue:({ user } : { user : any }) => `${user.id}`,
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
        defaultValue:({ user } : { user : any }) => `${user.name}`,
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
          handler: async (req : any, res : any) => {
            const { id } = req.params;
            const { user, body } = req;
            try {
              const newComment = await payload.create({
                collection: 'comments',
                data: {
                  student_id: user.id,
                  student_name: user.name,
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
                  comments: [ ...(content.comments as string[] || []), newComment.id],
                },
              });
              return res.status(200).json({ content: updatedContent });
            } catch (error) {
              console.error('Error adding comment:', error);
              return res.status(500).json({ message: 'Error adding comment' });
            }
          },
      }
  ],
  };
  
  export default Comments;
  