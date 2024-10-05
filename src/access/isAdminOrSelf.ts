import { Access, FieldAccess } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (user) {
    if (user.type?.includes('admin')) {
      console.log('admin')
      return true
    }
    console.log('self')
    return Boolean(user?.id == id)
  }
  return false
}

export const isAdminOrSelfFieldAccess: FieldAccess = ({ req: { user }, id }) => {
  if (user) {
    if (user.type?.includes('admin')) {
      return true
    }
    return Boolean(user?.id == id)
  }
  return false
}
