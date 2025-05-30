import React, {createContext, useState, useEffect } from 'react';

export const userAccountContext = createContext();

export const UserAccountProvider = ({children})=>{
const [userAuthChecked, setUserAuthChecked] = useState(false);
    const [userAuth, setUserAuth] = useState({
    token:null,
    user:null
});

  




useEffect(()=>{
    const storedUserToken  = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    let storedUser = null;  

    if(userString && userString !== "undefined") {
        storedUser = JSON.parse(userString);
    }
    if(storedUser && storedUserToken)
    {
     setUserAuth({
        token:storedUserToken,
        user:storedUser
     })   
    }
    setUserAuthChecked(true);
},[]);

const login = (userToken,user) =>{
    setUserAuth({token:userToken, user:user});
    localStorage.setItem("token",userToken);
    localStorage.setItem("user",JSON.stringify(user));
}

const logout = ()=>{
    setUserAuth({token:null, user:null});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

return(
    <userAccountContext.Provider value={{userAuth, login, logout, userAuthChecked}}>
        {children}
    </userAccountContext.Provider >
  )
}