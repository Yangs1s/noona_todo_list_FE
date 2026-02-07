import { Navigate } from "react-router-dom";
import type { User } from "../types/user";

const PrivateRoute = ({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) => {
  console.log(user);
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
