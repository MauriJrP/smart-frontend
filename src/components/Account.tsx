import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AccountMenu from './AccountMenu';

const SignInButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Button onClick={handleClick}  className="text-white">
      Iniciar sesión
    </Button>
  )
}

export default function BasicMenu() {
  const {auth} = useAuth();

  return (
    <>
      {!auth.loggedIn ? <SignInButton /> : <AccountMenu />}
    </>
  );
}