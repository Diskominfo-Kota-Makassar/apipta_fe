import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check role authorization if specified (RBAC enforcement)
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = Number(user.role_id);
    if (!allowedRoles.includes(userRole)) {
      // Forbidden: role not authorized for this route
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// PropTypes validation for children
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.number),
};

export default ProtectedRoute;
