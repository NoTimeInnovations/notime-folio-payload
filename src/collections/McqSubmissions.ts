import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { CollectionConfig } from 'payload'
import { isAdminOrStudent } from '@/access/isCombination'
const McqSubmission: CollectionConfig = {
  slug: 'mcq-submissions',
  access: {
    read: ()=>true,
    create: isAdminOrStudent,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'student_id',
      defaultValue: ({ user }: { user: any }) => `${user.id}`,
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'task_id',
      type: 'relationship',
      relationTo: 'tasks',
      required: true,
    },
    {
      name: 'option_selected',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'option_no',
          type: 'number',
          required: true,
        }
      ]
    },
  ],
}

export default McqSubmission
