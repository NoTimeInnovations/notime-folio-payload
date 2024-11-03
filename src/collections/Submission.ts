import { Access, CollectionConfig } from 'payload/types';
import { isAdminOrSelfFieldAccess } from '../access/isAdminOrSelf';
import { isAdminOrMentorFieldLevel } from '../access/isCombination';

const canReadSubmission: Access = ({ req: { user } }) => {
  console.log("user:", user);
  if (user.type === 'admin' || user.type === 'mentor') return true;
  if (user) {
    return {
      user: {
        equals: user.id,
      },
    };
  }
  return false;
};

const Submissions: CollectionConfig = {
  slug: 'submissions',
  access: {
    create: ({ req: { user } }) => !!user,
    read: canReadSubmission,
    update: ({ req: { user } }) => user && (user.type === 'admin' || user.type === 'mentor'),
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => `${user.id}`,
      required: true,
    },
    {
      name: 'task',
      type: 'relationship',
      relationTo: 'tasks',
      required: true,
    },
    {
      name: 'problem',
      type: 'group',
      interfaceName: 'Meta',
      fields: [
        {
          name: 'answer',
          type: 'textarea',
        },
        {
          name: 'imageUrl',
          type: 'relationship',
          relationTo: "media",
        },
        {
          name: 'github_link',
          type: 'text',
          required: true,
        },
        {
          name: 'live_link',
          type: 'text',
        }
      ],
    },
    {
      name: 'mcq',
      type: 'group',
      interfaceName: 'Meta',
      fields: [
        {
          name: 'selectedOption',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'submitted',
      access: {
        create: isAdminOrSelfFieldAccess,
        update: isAdminOrMentorFieldLevel,
      },
      options: [
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
      ],
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/',
      method: 'post',
      handler: async (req, res, next) => {
        const { user } = req;
        const { task } = req.body;
        if (!user) {
          return res.status(500).json({
            errors: [{
              message: "token invalid"
            }]
          });
        }
        const existingSubmission = await req.payload.find({
          collection: 'submissions',
          where: {
            and: [
              {
                user: {
                  equals: user.id,
                }
              },
              {
                task: {
                  equals: task,
                },
              }
            ],
          },
        });

        try {
          if (existingSubmission.docs.length > 0) {
            var result =await req.payload.update({
              collection: 'submissions',
              id: existingSubmission.docs[0].id,
              data: req.body,
              user: req.user,
            });
          } else {
            var result = await req.payload.create({
              collection: 'submissions',
              data: req.body,
              user: req.user,
            });
          }
        } catch (error) {
          console.log(error);
          res.status(201).json({
            errors:[
              {
                message:error.message
              }
            ]
          });
        }
        res.status(201).json(result);
      },
    },
    {
      path: '/:task_id',
      method: 'get',
      handler: async (req, res, next) => {
        const { user } = req;
        if (!user) {
          return res.status(500).json({
            errors: [{
              message: "token invalid"
            }]
          });
        }
        try {
          var result = await req.payload.find({
            collection: 'submissions',
            where: {
              and: [
                {
                  user: {
                    equals: user.id,
                  }
                },
                {
                  task: {
                    equals: req.params.task_id,
                  },
                }
              ],
            },
          });
        } catch (error) {
          console.log(error);
          res.status(201).json({
            errors:[
              {
                message:error.message
              }
            ]
          });
        }
        res.status(201).json(result);
      },
    },
  ],
};

export default Submissions;
