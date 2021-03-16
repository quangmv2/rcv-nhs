import React, { createContext, FunctionComponent, useContext, useState } from "react";


type TypeAuth = {
    auth: any,
    setAuth?: Function,
    init: boolean
    setInit?: Function
}

const AuthContext = createContext<TypeAuth>({
    auth: null,
    init: true
});

const AuthProvider: FunctionComponent = ({
    children
}) => {

    const [auth, setAuth] = useState<TypeAuth>();
    const [init, setInit] = useState<boolean>(true);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            init,
            setInit
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useStore = () => useContext<TypeAuth>(AuthContext);

export default AuthProvider;