import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='text-center'>
        <h2 className='mb-3'>WelCome To CMS</h2>
        <Link className='text-white bg-blue-600 border rounded-lg p-2' href={`/admin/login`}>Go to Admin</Link>
      </div>
    </div>
  )
}
