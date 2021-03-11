import { useSubscription } from "@apollo/client"
import { listenQuestionGQL } from "../../../graphql"

const useGetContest = () => {
    
}


const useListenQuestion = (id_contest: string, id_user?: string) => {
    const { data,  } = useSubscription(listenQuestionGQL, {
        variables: {
            id_contest,
            id_user
        }
    });
    return {
        data
    }
}

export {
    useListenQuestion
}