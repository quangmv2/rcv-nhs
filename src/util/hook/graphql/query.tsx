import { useSubscription } from "@apollo/client"
import { listenQuestionGQL } from "../../../graphql"

const useGetContest = () => {
    
}


const useListenQuestion = (id_contest: string, id_user?: string) => {
    const { data,   } = useSubscription(listenQuestionGQL, {
        variables: {
            id_contest,
            id_user
        },
        shouldResubscribe: true,
        // skip: true,
        onSubscriptionComplete: () => {
            console.log("Sub ok");
            
        }

    });
    return {
        data
    }
}

export {
    useListenQuestion
}