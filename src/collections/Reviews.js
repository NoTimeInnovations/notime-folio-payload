import payload from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf'
import { isAdminOrStudent } from '../access/isCombination'
import { CollectionConfig } from 'payload'

const Reviews = {
  slug: 'reviews',
  access: {
    read: () => true,
    update: isAdmin,
    delete: async ({ req, id }) => {
      if (!id) {
        // allow the admin UI to show controls to delete since it is indeterminate without the id
        return true
      }
      const review = await payload.findByID({ collection: 'reviews', id })
      return req?.user?.type === 'admin' || review.user_id === req?.user?.id
    },
    create: isAdminOrStudent,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      defaultValue: (context) => context?.user?.id,
      relationTo: 'users',
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
}

export default Reviews
