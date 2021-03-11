import { useMutation } from "@apollo/client"
import { resolve } from "path"
import { useState } from "react"
import { createContest as createContestgql, loginMutation, user } from "../../../graphql"

const useLogin = () => {

    const [loginServer, { data, error }] = useMutation(loginMutation)

    const login = (username: string, password: string) => {
        loginServer({
            variables: {
                username,
                password
            }
        }).catch(err => console.log(err))
    }

    return {
        login,
        data,
        error
    }

}

const useGetUser = () => {

    const [get] = useMutation(user);
    const [loading, setLoading] = useState<boolean>(true);

    const getUser = () => new Promise((reslove, reject) => {
        setLoading(true)
        get().then(data => {
            reslove(data.data)
            setLoading(false)

        }).catch(err => {
            reject(err)
            setLoading(false)
        });
    })

    return {
        getUser,
        loading
    }

}

const useCreateContest = () => {

    const [ create, { data, loading, error } ] = useMutation(createContestgql);

    const createContest = (values: any) => new Promise((reslove, reject) => {
        create({
            variables: values
        }).catch(err => reject(err)).then((data) => reslove(data))
    })

    return {
        createContest, 
        data,
        loading,
        error
    }

}


export {
    useLogin,
    useGetUser,
    useCreateContest
}