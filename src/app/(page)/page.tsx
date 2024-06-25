'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const userData = Cookies.get('userData');
  if (userData) {
    router.push('/games');
  } else {
    router.push('/auth');
  }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='h-[20vh] w-[20vh] rounded-full border-y-2 border-l-2 animate-spin'></div>
    </div>
  );
}
