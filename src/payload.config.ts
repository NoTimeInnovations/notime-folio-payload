import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import Users from './collections/Users';
import ProblemSubmissions from './collections/ProblemSubmissions';
import Courses from './collections/Courses';
import Tasks from './collections/Tasks';
import Comments from './collections/Comments';
import Content from './collections/Content';
import Reviews from './collections/Reviews';
import McqSubmission from './collections/McqSubmissions';
import Badges from './collections/badges';
import Media from './collections/Media';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            fs: false,
            stream: require.resolve('stream-browserify'),
            url: require.resolve('url/'),
            querystring: require.resolve('querystring-es3'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            crypto: require.resolve('crypto-browserify'),
            vm: require.resolve('vm-browserify'), // Add this line
          },
        },
      };
    },
  },
  editor: slateEditor({}),
  collections: [Users, McqSubmission, ProblemSubmissions, Courses, Tasks, Comments, Content, Reviews, Badges,Media],
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
});
