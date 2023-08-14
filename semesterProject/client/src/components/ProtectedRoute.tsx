import React from "react";
import {Navigate, Route} from 'react-router-dom';
import {useCurrentUser} from "../contexts/UserContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
   children, redirectPath
}) => {
    const currentUser = useCurrentUser();

    if (!currentUser?.isAdmin) {
        return <Navigate to={redirectPath} replace/>;
    }

    return <>{children}</>
};

export default ProtectedRoute;
