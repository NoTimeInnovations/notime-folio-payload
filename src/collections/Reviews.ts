
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
          return false;
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
          path: '/:id',
          method: 'post',
          handler: async (req, res) => {
            const { id } = req.params;
            const { user, body } = req;
            try {
              console.log(user);
              if(!user||!user.courses.some(course => course.id ==id)) {
                return res.status(500).json({
                  "message": "user unauthorized",
                  "success":false,
                });
              };
              const newReview = await payload.create({
                collection: 'reviews',
                data: {
                  description: body.description,
                  rating:body.rating,
                  user_name:user.name,
                  user_id:user.id
                },
                depth:0
              });
              
              console.log(newReview);
              const courses = await payload.findByID({
                collection: 'courses',
                id,
                depth:0
              });
        
              if (!courses) {
                return res.status(404).json({ message: 'courses not found' });
              }
              console.log(courses);
              await payload.update({
                collection: 'courses',
                id,
                data: {
                  reviews: [ ...(courses.reviews as string[] || []), newReview.id],
                },
                depth:0
              });
              return res.status(200).json({  newReview });
            } catch (error) {
              console.error('Error adding review:', error);
              return res.status(500).json({ message: 'Error adding review' });
            }
          },
      }
  ]
  };
  
  export default Reviews;
  