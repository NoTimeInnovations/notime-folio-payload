import { Access } from 'payload'

export const isAdminOrMentorOrSubscriber: Access = ({ req: { user }, id }) => {
  const idStr = String(id)

  if (user) {
    if (user.type?.includes('admin')) {
      console.log('admin')
      return true
    }
    if (user.type?.includes('mentor')) {
      console.log('mentor')
      return true
    }

    if (user?.courses?.includes(idStr)) {
      console.log('self')
      return true
    }
    return Boolean(user?.id === idStr)
  }
  return false
}
