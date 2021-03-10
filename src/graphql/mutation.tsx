import { gql } from "@apollo/client"

const loginMutation = gql`
mutation login($username: String!, $password: String!){
    login(input: {
      username: $username,
      password: $password
    }){
      access_token
    }
  }
`


export {
    loginMutation
}