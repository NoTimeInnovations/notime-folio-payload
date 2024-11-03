import payload from 'payload';
import { isAdminFieldLevel } from '../access/isAdmin';
import { CollectionConfig } from 'payload/types';

const Comments:CollectionConfig = {
    slug: 'comments',
    access:{
      update:async ({ req, id }) => {
        if (!id) {
          return false;
        }
        const comment = await payload.findByID({ collection: 'comment', id });
        return req.user.type === 'admin' || comment.user_id === req.user.id;
      },
      delete: async ({ req, id }) => {
        if (!id) {
          return true
        }
        const comment = await payload.findByID({ collection: 'comment', id });
        return req.user.type === 'admin' || comment.user_id === req.user.id;
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
      {   // for posting the comment
          path: '/:content_id',
          method: 'post',
          handler: async (req, res) => {
            const { content_id } = req.params;
            const { user, body } = req;
            if(!user){
              return res.json({
                message:"unauthroized",
                sucess:'false'
              })
            }
            console.log({ user, body });
            try {
              const newComment = await payload.create({
                collection: 'comments',
                data: {
                  user_id: user.id,
                  user_name:user.name,
                  content: body.content,
                },
                depth:0
              });
              console.log("new Commnet :",newComment);
              const content = await payload.findByID({
                collection: 'contents',
                id:content_id,
                depth:0
              });
              console.log("Content :",content);
              if (!content) {
                return res.status(404).json({ message: 'Content not found' });
              }
              await payload.update({
                collection: 'contents',
                id:content_id,
                data: {
                  comments: [...(content.comments as string[]), newComment.id],
                },
                depth:0
              });
              return res.status(200).json({ newComment });
            } catch (error) {
              console.error('Error adding comment:', error);
              return res.status(500).json({ message: 'Error adding comment' });
            }
          },
      }
  ],
  };
  
  export default Comments;
  