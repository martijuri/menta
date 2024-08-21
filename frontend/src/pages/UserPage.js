import { useAuth } from '../context/AuthContext';


const UserPage = () => {
  const { logout } = useAuth();

    return (
        <>
        <h1> User Page</h1>
        <button onClick={logout}>Logout</button>
        </>
    )
}

export default UserPage;