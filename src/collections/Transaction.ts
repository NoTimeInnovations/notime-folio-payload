import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { Access, CollectionConfig } from "payload/types";

const canReadSubmission: Access = ({ req: { user } }) => {
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

const Transactions: CollectionConfig = {
    slug: 'transactions',
    access: {
        read:canReadSubmission,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name:'user',
            type:'relationship',
            relationTo:"users",
            defaultValue: ({ user }) => user.id,
            required:true,
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
        },
        {
            name: 'discount',
            type: 'number',
            required: false,
        },
        {
            name: 'code',
            type: 'text',
        },
        {
            name: 'method',
            type: 'text',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'process',
            options: [
                {
                    label: 'Process', 
                    value: 'process',
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
        {
            name: 'course',
            type: 'relationship',
            relationTo: 'courses',
            required: true,
        },
    ],
};

export default Transactions;
