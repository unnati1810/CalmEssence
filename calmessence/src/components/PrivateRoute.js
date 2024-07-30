import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import according to your auth context location

const PrivateRoute = ({ element: Element }) => {
    const { user } = useAuth(); // Replace with your authentication logic

    return user ? <Element /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
