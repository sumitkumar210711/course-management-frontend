import React, {useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAccountContext } from "../contextAPI/userAccountContext";

export const SecureRoute = ({allowedUserRoles})=>{

    const {userAuth, userAuthChecked} =useContext(userAccountContext);

    if(!userAuthChecked){
        return <div> Loading.... </div>
    }
    

    if(!userAuth?.token || !userAuth?.user){
        return <Navigate to='/login' replace/>;
    }

    if(!allowedUserRoles.includes(userAuth.user.role)){
        console.log("hello");
    }

    return <Outlet />;

}
