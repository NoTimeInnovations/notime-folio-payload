import { CollectionConfig } from 'payload/types';
import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'image_url',
      type: 'text',
      admin:{
        readOnly:true
      },
      required: false,
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      admin:{
        readOnly:true
      },
      required: false,
    },
  ],
  hooks: {
    beforeChange: [
        async ({ data, req }) => {
            console.log(req.files.file);
          if (req.files) {
            const file = req.files.file;
            const uploadsDir = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const tempFilePath = path.join(uploadsDir, file.name);
            await file.mv(tempFilePath);
            try {
                if (data.cloudinaryId) {
                    try {
                      await cloudinary.v2.uploader.destroy(data.cloudinaryId, { invalidate: true });
                    } catch (error) {
                      throw new Error('Failed to delete Cloudinary image.');
                    }
                  }
              const result = await cloudinary.v2.uploader.upload(tempFilePath, {
                folder: 'media',
                resource_type: 'image', 
              });
              console.log(result);
              data.image_url = result.url;
              data.cloudinaryId = result.public_id;
            } catch (error) {
              throw new Error('Image upload failed.');
            } finally {
              fs.unlinkSync(tempFilePath);
            }
          }
          return data;
        },
      ],
    afterDelete: [
      async ({ doc }) => {
        if (doc.cloudinaryId) {
          try {
            await cloudinary.v2.uploader.destroy(doc.cloudinaryId, { invalidate: true });
          } catch (error) {
            throw new Error('Failed to delete Cloudinary image.');
          }
        }
      },
    ],
  },
};

export default Media;
