import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import { Spinner } from "@nextui-org/react";

const PrivateRoute = ({ children }) => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-[68vh] w-100vw flex justify-center items-center">
        <Spinner color="success" label="Loading..." />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
