
import payload from 'payload';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { isAdminOrStudent } from '../access/isCombination';
import { CollectionConfig } from 'payload/types';


const Reviews:CollectionConfig = {
    slug: 'reviews',
    access:{
      update:isAdmin,
      delete: async ({ req, id }) => {
        if (!id) {
          // allow the admin UI to show controls to delete since it is indeterminate without the id
          return true
        }
        const review = await payload.findByID({ collection: 'reviews', id });
        return req.user.type === 'admin' || review.user_id === req.user.id;
      },
      create:isAdminOrStudent
    }, 
    fields: [
      {
        name: 'user_name',
        type: 'text',
        defaultValue: ({ user }) => `${user.name}`,
        access:{
          create:isAdminFieldLevel,          // admin can create/update but when the student create it will have its id
          update:isAdminFieldLevel,
        },
        required: true,
      },
      {
        name: 'user_id',
        type: 'relationship',
        defaultValue: ({ user }) => `${user.id}`,
        relationTo: 'users',
        access:{
          create:isAdminFieldLevel,
          update:isAdminFieldLevel,
        },
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
      },
      {
        name: 'rating',
        type: 'number',
        required: true,
      },
    ],
    endpoints: [
      {
          path: '/reviews/:id',
          method: 'post',
          handler: async (req, res) => {
            const { id } = req.params;
            const { user, body } = req;
            
            try {
              if(!user) throw Error("unAuthorized");
              const newComment = await payload.create({
                collection: 'reviews',
                data: {
                  content: body.content,
                },
              });
              const content = await payload.findByID({
                collection: 'courses',
                id,
              });
        
              if (!content) {
                return res.status(404).json({ message: 'Content not found' });
              }
              const updatedContent = await payload.update({
                collection: 'contents',
                id,
                data: {
                  reviews: [ ...(content.reviews as string[] || []), newComment.id],
                },
              });
              return res.status(200).json({ review: updatedContent });
            } catch (error) {
              console.error('Error adding review:', error);
              return res.status(500).json({ message: 'Error adding review' });
            }
          },
      }
  ]
  };
  
  export default Reviews;
  