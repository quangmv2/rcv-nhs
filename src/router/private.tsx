import React, { FunctionComponent, memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGetUser } from "../util";
import { useStore } from "../store";

const Private = ({
    MyComponent
}: any) => {

    const { getUser, loading } = useGetUser()
    const { auth, setAuth, setInit } = useStore()
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('access_token')){
            history.push('/login');
            return;
        }
        syncUser()
    }, [])

    const syncUser = () => {
        console.log(1);
        
        getUser().then(data => {
            console.log(data);
            setAuth && setAuth(data)
            setInit && setInit(false)
        }).catch(err => {
            console.log(err);
            history.push('/login');
            setInit && setInit(false)
        })

    }


    return(
        <>
            { 
                loading ? <p>Logging...</p>: MyComponent && <MyComponent />
            }
        </>
    )
}

export default memo(Private);