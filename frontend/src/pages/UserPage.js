import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/forms/UserProfile';

const UserPage = () => {
  const { logout, user, updateAccount } = useAuth();
 
    return (
        <>
        <UserProfile user={user} updateUser={updateAccount} logout={logout} />
        </>
    )
}

export default UserPage;
