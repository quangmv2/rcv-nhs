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
    dv
    image
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



const listenQuestionGQL = gql`
subscription listenContestStart($id_contest: String, $id_user: String){
  listenContestStart(input: {
    id_contest: $id_contest,
    id_user: $id_user
  }) {
    time
    question{ 
    	id
      question
      answers
      currentTime
    }
    type
    time
    answer {
      id_question
      answer
    }
  }
}

`

export {
  contests,
  queryQuestionsGQL,
  getUsers,
  getQuestions,
  listenQuestionGQL,
}