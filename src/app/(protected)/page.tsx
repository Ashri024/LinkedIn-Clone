import LogoutButton from '@/components/Logout/LogoutButton';

export default async function HomePage() {
  return <div className='background-theme text-theme'>
    Welcome to LinkedIn Home
    <LogoutButton/>
  </div>;
}
