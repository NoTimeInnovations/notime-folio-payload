import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'

import ProblemSubmissions from './collections/ProblemSubmissions'
import Courses from './collections/Courses'

import Tasks from './collections/Tasks'
import Comments from './collections/Comments'
import Content from './collections/Content'
import Reviews from './collections/Reviews'
import McqSubmission from './collections/McqSubmissions'
import Badges from './collections/badges'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users,McqSubmission,ProblemSubmissions,Courses,Tasks,Comments,Content,Reviews,Badges],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
