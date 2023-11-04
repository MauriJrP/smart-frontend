import { Stack, Card,  CardContent, Divider, Rating, Avatar } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { IUser } from '../../types'
// import { users } from '../../data'
// import UpdateInfo from './components/UpdateInfo'


export default function ProfilePage() {
  const {auth} = useAuth();
  const user = auth.user as IUser;

  return (
    <Card sx={{ minWidth: 275 }} className="drop-shadow-lg mb-2 m-2 md:w-96 mx-auto md:mt-10">
      <CardContent className="flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <Avatar src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG-File.png&f=1&nofb=1" sx={{ width: 240, height: 240 }}/>
          <h2 className="mt-8 text-4xl">{user.first_name}</h2>
          <Divider className="my-2" variant="middle" flexItem/>
        </div>
          <div className="flex flex-col p-2">
            <p className="ml-2 text-gray-700">Correo: {user.email}</p>
            {/* <p className="ml-2 text-gray-700">Edad: {user.age}</p> */}
            <p className="ml-2 text-gray-700">Password: {user.password}</p>
            {/* <p className="ml-2 text-gray-700">Genero: {user.gender}</p> */}
            {/* <p className="ml-2 text-gray-700">Rol: {user.role}</p> */}
            {/* <p className="ml-2 text-gray-700">Rol: {user.}</p> */}
          </div>
          {/* <UpdateInfo/> */}
      </CardContent>
    </Card>
  )
}
