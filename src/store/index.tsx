import React, { createContext, FunctionComponent, useContext, useState } from "react";


type TypeAuth = {
    auth: any,
    setAuth?: Function
}

const AuthContext = createContext<TypeAuth>({
    auth: null
});

const AuthProvider: FunctionComponent = ({
    children
}) => {

    const [auth, setAuth] = useState<TypeAuth>();

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useStore = () => useContext<TypeAuth>(AuthContext);

export default AuthProvider;