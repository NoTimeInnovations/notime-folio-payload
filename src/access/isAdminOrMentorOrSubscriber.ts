import { Access } from 'payload'

export const isAdminOrMentorOrSubscriber: Access = ({ req: { user }, id }) => {
  

  if (user) {
    if (user.type?.includes('admin')) {
      console.log('admin')
      return true
    }
    if (user.type?.includes('mentor')) {
      console.log('mentor')
      return true
    }

    if (id && typeof id === 'object' && user?.courses?.includes(id)) {
      console.log('self')
      return true
    }

    return Boolean(user?.id === id)
  }
  return false
}
