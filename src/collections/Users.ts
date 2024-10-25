import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf'
import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 3600 * 24 * 30, // 30 days
  },
  access: {
    create: async ({ req }: { req: any }) => {
      if (req.user && req.user.type === 'admin') {
        return true
      }
      if (req.body && req.body.type) {
        req.body.type = 'student'
      }
      return true
    },
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
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
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'courses_unlocked',
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
          name: 'course_id',
          type: 'text',
          required: true,
        },
        {
          name: 'roadmap_id',
          type: 'text',
          hasMany: true,
          required: true,
        },
        {
          name: 'topic_id',
          type: 'text',
          hasMany: true,
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
  ],
}

export default Users
