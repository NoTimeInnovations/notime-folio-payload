import { isAdmin } from '@/access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload';
import { isAdminOrStudent, isAdminOrStudentFieldLevel } from '@/access/isCombination';

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
          name: 'value',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
};

export default McqSubmission;
