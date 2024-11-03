import { Access } from "payload/config";
import { FieldAccess } from "payload/types";

export const isAdminOrSelf: Access = ({ req: { user } ,id}) => {

  if (user) {
    if (user.type?.includes('admin')) {
      return true;
    }
    return Boolean(user?.id?.includes(id));
  }
  return false;
}

export const isAdminOrSelfFieldAccess: FieldAccess = ({ req: { user },id}) => {
    if (user) {
      if (user.type?.includes('admin')) {
        return true;
      }
      return Boolean(user?.id?.includes(id));
    }
    return false;
}