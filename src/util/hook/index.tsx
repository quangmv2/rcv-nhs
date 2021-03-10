import { useMutation } from "@apollo/client"
import { loginMutation } from "../../graphql"

const useLogin = () => {

    const [loginServer, { data, error }  ]= useMutation(loginMutation)

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


export {
    useLogin
}