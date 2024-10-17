import {isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { isAdminOrMentorFieldLevel } from '../access/isCombination';
import { CollectionConfig } from 'payload/types';
const ProblemSubmission:CollectionConfig = {
  slug: 'problem-submissions',
  admin: {
    useAsTitle: 'problem_name',
  },
  access:{
    create:isAdminOrSelf,
  },
  fields: [
    {
      name: 'user_id',
      type: 'relationship',
      defaultValue: ({ user }) => `${user.id}`,
      access:{
        create:isAdminFieldLevel,
        update:isAdminFieldLevel,
      },
      relationTo: 'users',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'problem_id',
      type:'text',
      required: true,
    },
    {
      name: 'problem_name',
      type:'text',
      required: true,
    },
    {
      name: 'task_id',
      type: 'relationship',
      relationTo: 'tasks',
      required: true,
    },
    {
      name: 'github_link',
      type: 'text',
      required: true,
    },
    {
      name: 'live_link',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: "submitted",
      access:{
        create:isAdminOrSelfFieldAccess,
        update:isAdminOrMentorFieldLevel,
      },
      options: [
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
      ],
      required: true,
    },
  ],
};

export default ProblemSubmission;
