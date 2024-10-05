import { Access } from "payload/config";
import { FieldAccess } from "payload/types";

export const isAdminOrMentorOrSubscriber: Access = ({ req: { user } ,id}) => {

  if (user) {
    if (user.type?.includes('admin')) {
        console.log("admin");
      return true;
    }
    if (user.type?.includes('mentor')) {
        console.log("admin");
      return true;
    }
    if(user.coures.includes(id))
    console.log("self");
    return Boolean(user?.id?.includes(id));
  }
  return false;
}