import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
    isLoggedInVar,
    systemInfoVar,
    userPermissions,
} from "../../store/cache";
import { useEffect } from "react";
import { warningBox } from "../../utils/helpers";
import { MY_PERMISSIONS } from "../../utils/constants";

const Auth = () => {
    let location = useLocation();

    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const systemInfo = useReactiveVar(systemInfoVar);
    const perms = useReactiveVar(userPermissions);


    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.

        // state={{ from: location }}

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default Auth;