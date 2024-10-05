import { Access, FieldAccess } from "payload";

export const isMentor: Access= ({ req: { user } }) => {
  // Return true or false based on if the user has an Mentor role
  return Boolean(user?.type?.includes('mentor'));
}

export const isMentorFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an Mentor role
  return Boolean(user?.type?.includes('mentor'));
}