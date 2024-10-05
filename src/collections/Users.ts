import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import payload from 'payload';
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      access: {
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Mentor',
          value: 'mentor',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
      defaultValue: 'student',
    },
    {
      name: 'stars',
      type: 'number',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'points',
      type: 'number',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'level',
      type: 'number',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        {
          name: 'badge_id',
          type: 'text',
        },
      ],
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'projects',
      type: 'array',
      fields: [
        {
          name: 'github',
          type: 'text',
          required: false,
        },
        {
          name: 'live_link',
          type: 'text',
          required: false,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'github',
      type: 'text',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      }
    },
    {
      name: 'linkedin',
      type: 'text',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      }
    },
    {
      name: 'image_url',
      type: 'text',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
        description: 'URL of the user profile image',
      },
    },
  ],
  access: {
    create: async ({ req }) => {
      console.log("Incoming create request body:", req.body); // Log the request body
      console.log("Authenticated user:", req.user); // Log the authenticated user
      if (req.user && req.user.type === 'admin') {
        return true; // Allow admin to create users of any type
      }
      if (req.body && req.body.type) {
        req.body.type = 'student'; // Enforce student type for non-admin users
      }
      return true;
    },
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
};

export default Users;
