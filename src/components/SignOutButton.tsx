import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { logout } from '../authApi';
import { Button } from './Button';

export const SignOutButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="flex gap-0 lg:gap-1 flex-col lg:flex-row items-center"
      onClick={async () => {
        await logout();
        navigate('/');
      }}
    >
      <IoLogOutOutline className="text-2xl" title="Log out" />
      <div className="text-xs lg:text-base">Sign out</div>
    </Button>
  );
};
