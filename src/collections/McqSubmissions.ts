import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload';
const McqSubmission:CollectionConfig = {
  slug: 'mcq-submissions',
  access:{
    //read: isAdminMentorOrSelf,
    create:isAdminOrSelf,
  },
  fields: [
    {
      name: 'student_id',
      defaultValue: ({ user } : { user : any }) => `${user.id}`,
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
      type: 'text'
    },
  ],

};

export default McqSubmission;
