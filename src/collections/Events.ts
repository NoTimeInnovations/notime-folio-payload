import { isAdmin } from "@/access/isAdmin";
import { isAdminOrStudent } from "@/access/isCombination";
import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: 'events',
  access : {
    read: isAdminOrStudent,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      required: true
    },
    {
      name: 'date',
      type: 'date',
      required: true
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Upcoming',
          value: 'upcoming'
        },
        {
          label: 'Completed',
          value: 'completed'
        }
      ]
    },
    {
      name: 'location',
      type: 'text',
      required: true
    },
    {
      name: 'trending',
      type: 'checkbox',
      required: true
    },
  ]
};