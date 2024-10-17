import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload/types';
const McqSubmission:CollectionConfig = {
  slug: 'mcq-submissions',
  access:{
    create:isAdminOrSelf,
  },
  fields: [
    {
      name: 'student_id',
      defaultValue: ({ user }) => `${user.id}`,
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'course_id',
      type: 'relationship',
      relationTo: 'courses',
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
      type: 'text'
    },
  ],

};

export default McqSubmission;
