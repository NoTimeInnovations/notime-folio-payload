import { redirect } from 'next/navigation'

const page = () => {
  return redirect('/admin');
}

export default page