// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig, CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'


import { Media } from './collections/Media'
import { Events } from './collections/Events'
import McqSubmission from './collections/McqSubmissions'
import ProblemSubmission from './collections/ProblemSubmissions'
import Courses from './collections/Courses'
import Tasks from './collections/Tasks'
import Comments from './collections/Comments'
import Reviews from './collections/Reviews'
import Badges from './collections/badges'
import Users from './collections/Users'
import Topic from './collections/Topic'
import Roadmap from './collections/Roadmap'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Events, McqSubmission,ProblemSubmission,Courses,Tasks,Comments as CollectionConfig,Roadmap,Reviews as CollectionConfig,Badges , Topic],
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
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        [Media.slug]: true
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  serverURL: process.env.SERVER_URL || 'http://localhost:3001',
  cors : {
    origins : ['http://localhost:3000','https://www.notime.co.in']
  }
})
