import { Access } from 'payload'

export const canReadSubmission: Access = ({ req: { user } }) => {
  if (user?.type === 'admin') {
    return true
  }

  // If user is a mentor, only allow access to submissions by their students
  if (user?.type === 'mentor') {
    const studentIds = (user.students || []).map((student: { id: any }) => student.id)
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
