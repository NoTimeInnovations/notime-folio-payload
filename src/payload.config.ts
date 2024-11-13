// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import Users from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import McqSubmission from './collections/McqSubmissions'
import ProblemSubmission from './collections/ProblemSubmissions'
import Courses from './collections/Courses'
import Tasks from './collections/Tasks'
import Comments from './collections/Comments'
import Roadmap from './collections/Roadmap'
import Reviews from './collections/Reviews'
import Badges from './collections/Badges'
import Topic from './collections/Topic'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Events,
    McqSubmission,
    ProblemSubmission,
    Courses,
    Tasks,
    Comments as CollectionConfig,
    Roadmap,
    Reviews as CollectionConfig,
    Badges,
    Topic,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // vercelBlobStorage({
    //   enabled: true, // Optional, defaults to true
    //   // Specify which collections should use Vercel Blob
    //   collections: {
    //     [Media.slug]: true
    //   },
    //   // Token provided by Vercel once Blob storage is added to your Vercel project
    //   token: process.env.BLOB_READ_WRITE_TOKEN || "",
    // }),
    s3Storage({
      enabled: true,
      collections: {
        [Media.slug]: true
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
  cors : '*'
})
