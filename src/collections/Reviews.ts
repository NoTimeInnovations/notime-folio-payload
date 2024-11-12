import payload, { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrStudent } from '../access/isCombination'

const Reviews : CollectionConfig = {
  slug: 'reviews',
  access: {
    read: isAdminOrStudent,
    update: isAdmin,
    delete: async ({ req, id }) => {
      if (!id) {
        // allow the admin UI to show controls to delete since it is indeterminate without the id
        return true
      }
      const review = await payload.findByID({ collection: 'reviews', id })
      return req?.user?.type === 'admin' || review.user.toString() === req?.user?.id
    },
    create: isAdminOrStudent,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      defaultValue: (context: { user: { id: string } }) => context?.user?.id,
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
