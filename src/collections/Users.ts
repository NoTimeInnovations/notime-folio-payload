import { AccessArgs, CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true,
    read: ({ req }: AccessArgs) => req.user?.role === 'admin',
    update: ({ req }: AccessArgs) => req.user?.role === 'admin',
    delete: ({ req }: AccessArgs) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Mentor',
          value: 'mentor',
        },
      ],
      defaultValue: 'admin',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.role === 'student',
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data.role === 'student' || data.role === 'mentor',
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data.role === 'student' || data.role === 'mentor',
      },
    },
    {
      name: 'profession',
      label: 'Profession',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data.role === 'student',
      },
    },
  ],
}
