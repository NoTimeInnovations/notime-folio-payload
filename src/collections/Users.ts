import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';
import { CollectionConfig } from 'payload/types';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin:{
    useAsTitle:'email'
  },
  access: {
    create: async ({ req }) => {
      if (req.user && req.user.type === 'admin') {
        return true;
      }
      if (req.body && req.body.type) {
        req.body.type = 'student';
      }
      return true;
    },
    read:isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength:4,
      maxLength:36
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
      access:{
        update:isAdminFieldLevel,
        create:isAdminFieldLevel,
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
      defaultValue:0,
      required: false,
      min:0,
      max:5,
      admin: {
        condition: ({ type }) => type === 'student',
      },access:{
        update:isAdminFieldLevel,
        create:isAdminFieldLevel,
      },
    },
    {
      name: 'points',
      type: 'number',
      defaultValue:0,
      required: false,
      min:0,
      admin: {
        condition: ({ type }) => type === 'student',
      },access:{
        update:isAdminFieldLevel,
        create:isAdminFieldLevel,
      },
    },
    {
      name: 'level',
      type: 'number',
      required: false,
      defaultValue:1,
      min:1,
      admin: {
        condition: ({ type }) => type === 'student',
      },access:{
        update:isAdminFieldLevel,
        create:isAdminFieldLevel,
      },
    },
    {
      name: 'badges',
      type: 'relationship',
      relationTo:'badges',
      hasMany:true,
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
      access:{
        update:isAdminFieldLevel,
        create:isAdminFieldLevel,
      },
      admin: {
        condition: ({ type }) => type === 'student',
      },
    },
    {
      name: 'transactions',
      type:'relationship',
      relationTo:'transactions',
      admin: {
        condition: ({ type }) => type === 'student',
      },
      hasMany:true,
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

  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.files && req.files["image_file"]) {
          try {
            const file = req.files["image_file"];
            const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxFileSizeInBytes) {
              throw new Error('File size exceeds 2MB limit.');
            }
            const uploadsDir = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadsDir)){
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            if (data.image_url) {
              const publicId = data.image_url.split('/').slice(-2).join('/').replace(/\.(jpg|png|jpeg)$/, '');
              await cloudinary.uploader.destroy(publicId, { invalidate: true });
            }
            const tempFilePath = path.join(uploadsDir, file.name);
            await file.mv(tempFilePath);
            const result = await cloudinary.uploader.upload(tempFilePath, {
              folder: 'users',
            });
            data.image_url = result.secure_url;
            fs.unlinkSync(tempFilePath);
          } catch (error) {
            throw new Error('Image upload failed.');
          }
        }
        return data;
      },
    ],
    afterDelete:[
      async({req,id,doc})=>{
       try {
        console.log(doc);
        if (doc.image_url) {
          const publicId = doc.image_url.split('/').slice(-2).join('/').replace(/\.(jpg|png|jpeg)$/, '');
          await cloudinary.uploader.destroy(publicId, { invalidate: true });
        }
       } catch (error) {
        throw new Error("image is not deleted");
       }
      }
    ]
  },
};

export default Users;
