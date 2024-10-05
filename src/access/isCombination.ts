import { Access, FieldAccess } from "payload/types";

export const isAdminOrMentor: Access= ({ req: { user } }) => {
  return Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('Mentor'));
}

export const isAdminOrMentorFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('Mentor'));
}

export const isAdminOrStudent: Access= ({ req: { user } }) => {
    console.log("is admin or student : " , Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('student')));
    return Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('student'));
}
export const isAdminOrStudentFieldLevel: FieldAccess = ({ req: { user } }) => {
    return Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('student'));
}

export const isMentorOrStudent: Access= ({ req: { user } }) => {
    return Boolean(user?.type?.includes('mentor'))||Boolean(user?.type?.includes('student'));
}

export const isMentorOrStudentFieldLevel: FieldAccess = ({ req: { user } }) => {
    return Boolean(user?.type?.includes('admin'))||Boolean(user?.type?.includes('mentor'));
}