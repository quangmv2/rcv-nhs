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

const user = gql`
  mutation {
    user{
      id
      username
      firstname
      lastname
      email
      idRole
      image
      dv
    }
  }`

const createContest = gql`
  mutation createContest($name: String!, $timeStart: Float!){
    createContest(input: {
      name: $name,
      timeStart: $timeStart
    }) {
      id
      name
      timeStart
    }
  }
`

const createQuestionGQL = gql`
mutation createOneQuestion(
    $question: String!
    $answers: [String!]
    $currentTime: Int
    $answer: Int
  ){
  createOneQuestion(input: {
    question: $question,
    answers: $answers
    answer: $answer,
    currentTime: $currentTime
  }) {
    id
    question
    answer
    currentTime
  }
}
`
const removeContestGQL = gql`
mutation removeContest($input: String){
  removeContest(input: $input){
    id
    name
  }
}
`

const toggleUserToContest = gql`
mutation toggleUserToContest($id_contest: String, $id_user: String){
  toggleUserToContest(input: {
    id_contest: $id_contest
    id_user: $id_user
  }) 
}
`

const toggleQuestionToContest = gql`
mutation toggleQuestionToContest($id_contest: String, $id_question: String){
  toggleQuestionToContest(input: {
    id_contest: $id_contest
    id_question: $id_question
  }) 
}
`

const userOfContest = gql`
mutation userOfContest($id_contest: String){
  userOfContest(id_contest: $id_contest){
    id
  }
}
`
const questionOfContestMutation = gql`
mutation questionOfContest($id_contest: String){
  questionOfContest(id_contest: $id_contest){
    id
    question
    answers
    answer
    currentTime
  }
}
`

const chooseAnswer = gql`
mutation answer($id_contest: String!, $id_question: String!, $answer: Int!){
  answer(input:{
    id_contest: $id_contest
    id_question: $id_question
    answer: $answer
  })
}
`
const getContest = gql`
mutation contest($id_contest: String){
  contest(id_contest: $id_contest){
    id
    name
    timeStart
    started
  }
  
}
`

const createUser = gql`
mutation createUser($username: String!, $password: String!, $email: String!, $firstname: String!, $lastname: String!, $image: String, $dv: String!){
  createUser(input: {
    username: $username,
  	password: $password,
    email: $email,
    firstname: $firstname,
    lastname: $lastname,
    image: $image,
    dv: $dv
  }) {
    id
    username
  }
}
`

const changePasswordGQL = gql`
mutation changePassword($input: String, $id_user: String){
  changePassword(input: $input, id_user: $id_user)
}
`


const resultGQL = gql`
mutation queryResult($id_contest: String){
  result(id_contest: $id_contest){
    user {
      id
      username
      firstname
      lastname
      dv
      image
    }
    correct
    reject
  }
}
`
const removeUser = gql`
mutation removeUser($input: String){
  removeUser(input: $input) {
    id
  }
}
`
const duplicateGQL = gql`
mutation duplicateContest($id_contest: String){
  duplicateContest(id_contest: $id_contest){
    id
  }
}
`

const updateContestGQL = gql`
mutation updateContest($id: String, $name: String, $timeStart: Float){
  updateContest(input: {
    id: $id
    name: $name
    timeStart: $timeStart
  }) {
    id
  }
}
`

const removeQuestionGQL = gql`
mutation removeQuestion($input: String){
  removeQuestion(input: $input){
    id
  }
}
`

export {
  loginMutation,
  user,
  createContest,
  createQuestionGQL,
  removeContestGQL,
  toggleUserToContest,
  toggleQuestionToContest,
  userOfContest,
  questionOfContestMutation,
  chooseAnswer,
  getContest,
  createUser,
  changePasswordGQL,
  resultGQL,
  removeUser,
  duplicateGQL,
  updateContestGQL,
  removeQuestionGQL
}