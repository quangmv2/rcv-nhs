import { gql } from "@apollo/client";

const contests = gql`
query {
  contests {
    id
    name
    timeStart
    started
    id_users
    id_questions
  }
}
`

const queryQuestionsGQL = gql`
query{
  queryQuestions{
    id
    question
    answers
    answer
    currentTime
    createdAt
    updatedAt
  }
}
`

const getUsers = gql`
query{
  getUsers{
    id
  	username
    firstname
    lastname
    email
  }
}
`

const getQuestions = gql`
query {
  queryQuestions{
    id
    question
    answers
    answer
    currentTime
    createdAt
    updatedAt
  }
}
`

export {
  contests,
  queryQuestionsGQL,
  getUsers,
  getQuestions
}