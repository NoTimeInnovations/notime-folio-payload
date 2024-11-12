import { User } from '@/payload-types'
import { Access } from 'payload'

export const canReadSubmission: Access = ({ req: { user } }) => {
  if (user?.type === 'admin') {
    return true
  }

  if (user?.type === 'mentor') {

    const studentIds = user?.students?.filter((student): student is User => typeof student !== 'string').map((student) => student.id);

    return {
      user_id: {
        in: studentIds,
      },
    }
  }

  if (user?.type === 'student') {
    return true
  }

  return false
}
