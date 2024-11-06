import { isAdminOrStudent, isMentorOrStudent } from '@/access/isCombination'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf'
import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 3600 * 24 * 30, // 30 days
  },
  access: {
    create: () => true,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'displayName',
    hidden: ({ user }) => {
      const userType = user?.type;  
      return userType === 'student' || userType === 'mentor';
    },
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.name && data?.email) {
              const newDisplayName = `${data.name} - ${data.email} - ${data.type}`
              return newDisplayName
            }
            return ''
          },
        ],
      },
      access: {
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
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
      access: {
        read: isAdminOrSelfFieldAccess,
      },
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
      type: 'array',
      admin: {
        condition: ({ type }) => type === 'student',
      },
      access: {
        read: () => true,
        update: isAdminOrSelfFieldAccess,
        create: isAdminOrSelfFieldAccess,
      },
      fields: [
        {
          name: 'course',
          type: 'relationship',
          required: true,
          relationTo: 'courses',
        },
        {
          name: 'roadmap_id',
          type: 'text',
          required: true,
        },
        {
          name: 'topic_id',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'github',
      type: 'text',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      required: false,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'mentor',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        condition: ({ type }) => type === 'student', // Only show this field for students
      },
      access: {
        read: isAdminFieldLevel,
        update: isAdminFieldLevel,
        create: isAdminFieldLevel,
      }
    },
  ],
}

export default Users;
