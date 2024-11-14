/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    events: Event;
    'mcq-submissions': McqSubmission;
    'problem-submissions': ProblemSubmission;
    courses: Course;
    tasks: Task;
    comments: Comment;
    roadmaps: Roadmap;
    reviews: Review;
    badges: Badge;
    topics: Topic;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    'mcq-submissions': McqSubmissionsSelect<false> | McqSubmissionsSelect<true>;
    'problem-submissions': ProblemSubmissionsSelect<false> | ProblemSubmissionsSelect<true>;
    courses: CoursesSelect<false> | CoursesSelect<true>;
    tasks: TasksSelect<false> | TasksSelect<true>;
    comments: CommentsSelect<false> | CommentsSelect<true>;
    roadmaps: RoadmapsSelect<false> | RoadmapsSelect<true>;
    reviews: ReviewsSelect<false> | ReviewsSelect<true>;
    badges: BadgesSelect<false> | BadgesSelect<true>;
    topics: TopicsSelect<false> | TopicsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs?: {
    tasks: unknown;
    workflows?: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  displayName?: string | null;
  image?: (string | null) | Media;
  name: string;
  type: 'student' | 'mentor' | 'admin';
  stars?: number | null;
  points?: number | null;
  level?: number | null;
  badges?:
    | {
        badge_id?: string | null;
        id?: string | null;
      }[]
    | null;
  projects?:
    | {
        github?: string | null;
        live_link?: string | null;
        title: string;
        id?: string | null;
      }[]
    | null;
  isEnrolled?: boolean | null;
  courses?:
    | {
        course: string | Course;
        roadmap_id: string;
        topic_id: string;
        id?: string | null;
      }[]
    | null;
  github?: string | null;
  linkedin?: string | null;
  students?: (string | User)[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses".
 */
export interface Course {
  id: string;
  image: string | Media;
  courseLevel: number;
  title: string;
  shortDesc: string;
  amount: number;
  discount?: number | null;
  pre_requirements?:
    | {
        requirement?: string | null;
        id?: string | null;
      }[]
    | null;
  learnings?:
    | {
        learning?: string | null;
        id?: string | null;
      }[]
    | null;
  Roadmap?: (string | Roadmap)[] | null;
  reviews?: (string | Review)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "roadmaps".
 */
export interface Roadmap {
  id: string;
  day: number;
  Topics: (string | Topic)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "topics".
 */
export interface Topic {
  id: string;
  topic: string;
  shortDesc: string;
  video: string | Media;
  videoThumbnail: string | Media;
  total_points: number;
  comments?: (string | Comment)[] | null;
  task?: (string | null) | Task;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments".
 */
export interface Comment {
  id: string;
  user_id: string | User;
  user_name: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tasks".
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  problems?:
    | {
        title: string;
        question: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        image?: (string | null) | Media;
        point?: number | null;
        id?: string | null;
      }[]
    | null;
  mcqs?:
    | {
        question?: string | null;
        options?:
          | {
              option?: string | null;
              id?: string | null;
            }[]
          | null;
        answer?: number | null;
        image?: (string | null) | Media;
        point?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: string;
  user: string | User;
  description?: string | null;
  rating: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  image: string | Media;
  registrationLink?: string | null;
  title: string;
  description: string;
  date: string;
  status: 'upcoming' | 'completed';
  location: string;
  trending: boolean;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mcq-submissions".
 */
export interface McqSubmission {
  id: string;
  student_id: string | User;
  task_id: string | Task;
  option_selected: {
    value: number;
    id?: string | null;
  }[];
  pointsScored?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problem-submissions".
 */
export interface ProblemSubmission {
  id: string;
  user_id: string | User;
  problem_id: string;
  problem_name: string;
  task_id: string | Task;
  github_link: string;
  live_link?: string | null;
  rejected_reason?: string | null;
  status: 'submitted' | 'rejected' | 'approved';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "badges".
 */
export interface Badge {
  id: string;
  name: string;
  image_url: string;
  decription: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'events';
        value: string | Event;
      } | null)
    | ({
        relationTo: 'mcq-submissions';
        value: string | McqSubmission;
      } | null)
    | ({
        relationTo: 'problem-submissions';
        value: string | ProblemSubmission;
      } | null)
    | ({
        relationTo: 'courses';
        value: string | Course;
      } | null)
    | ({
        relationTo: 'tasks';
        value: string | Task;
      } | null)
    | ({
        relationTo: 'comments';
        value: string | Comment;
      } | null)
    | ({
        relationTo: 'roadmaps';
        value: string | Roadmap;
      } | null)
    | ({
        relationTo: 'reviews';
        value: string | Review;
      } | null)
    | ({
        relationTo: 'badges';
        value: string | Badge;
      } | null)
    | ({
        relationTo: 'topics';
        value: string | Topic;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  displayName?: T;
  image?: T;
  name?: T;
  type?: T;
  stars?: T;
  points?: T;
  level?: T;
  badges?:
    | T
    | {
        badge_id?: T;
        id?: T;
      };
  projects?:
    | T
    | {
        github?: T;
        live_link?: T;
        title?: T;
        id?: T;
      };
  isEnrolled?: T;
  courses?:
    | T
    | {
        course?: T;
        roadmap_id?: T;
        topic_id?: T;
        id?: T;
      };
  github?: T;
  linkedin?: T;
  students?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  image?: T;
  registrationLink?: T;
  title?: T;
  description?: T;
  date?: T;
  status?: T;
  location?: T;
  trending?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mcq-submissions_select".
 */
export interface McqSubmissionsSelect<T extends boolean = true> {
  student_id?: T;
  task_id?: T;
  option_selected?:
    | T
    | {
        value?: T;
        id?: T;
      };
  pointsScored?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "problem-submissions_select".
 */
export interface ProblemSubmissionsSelect<T extends boolean = true> {
  user_id?: T;
  problem_id?: T;
  problem_name?: T;
  task_id?: T;
  github_link?: T;
  live_link?: T;
  rejected_reason?: T;
  status?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses_select".
 */
export interface CoursesSelect<T extends boolean = true> {
  image?: T;
  courseLevel?: T;
  title?: T;
  shortDesc?: T;
  amount?: T;
  discount?: T;
  pre_requirements?:
    | T
    | {
        requirement?: T;
        id?: T;
      };
  learnings?:
    | T
    | {
        learning?: T;
        id?: T;
      };
  Roadmap?: T;
  reviews?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tasks_select".
 */
export interface TasksSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  problems?:
    | T
    | {
        title?: T;
        question?: T;
        image?: T;
        point?: T;
        id?: T;
      };
  mcqs?:
    | T
    | {
        question?: T;
        options?:
          | T
          | {
              option?: T;
              id?: T;
            };
        answer?: T;
        image?: T;
        point?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments_select".
 */
export interface CommentsSelect<T extends boolean = true> {
  user_id?: T;
  user_name?: T;
  content?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "roadmaps_select".
 */
export interface RoadmapsSelect<T extends boolean = true> {
  day?: T;
  Topics?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews_select".
 */
export interface ReviewsSelect<T extends boolean = true> {
  user?: T;
  description?: T;
  rating?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "badges_select".
 */
export interface BadgesSelect<T extends boolean = true> {
  name?: T;
  image_url?: T;
  decription?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "topics_select".
 */
export interface TopicsSelect<T extends boolean = true> {
  topic?: T;
  shortDesc?: T;
  video?: T;
  videoThumbnail?: T;
  total_points?: T;
  comments?: T;
  task?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}