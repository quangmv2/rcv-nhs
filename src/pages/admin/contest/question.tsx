import { useMutation } from "@apollo/client";
import { Checkbox, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import { questionOfContestMutation, toggleQuestionToContest } from "../../../graphql";
import React, { FunctionComponent, useEffect, useState } from "react";
import { renderAnswer } from "../questions";
import { indexOf } from "lodash";

type Props = {
    visibleProp: boolean | null,
    setVisibleQuestion: Function,
    id_contest: string,
    questions: any[]
}

type PropsCheckBox = {
    checkProp: boolean,
    id_question: string
    id_contest: string
}

const JoinContest: FunctionComponent<PropsCheckBox> = ({
    checkProp = false,
    id_question,
    id_contest
}) => {

    const [checked, setChecked] = useState<boolean>(checkProp);
    const [toggleServer] = useMutation(toggleQuestionToContest)

    console.log(checked, id_question, checkProp);
    

    const toggle = () => {
        toggleServer({
            variables: { id_question, id_contest }
        }).then(d => {
            console.log(d);
            const { toggleQuestionToContest } = d.data;
            if (toggleQuestionToContest == "add") setChecked(true);
            else setChecked(false);
        }).catch(err => console.log(err))
    }

    return (
        <Checkbox
            onClick={toggle}
            checked={checked}
        ></Checkbox>
    )
}



const Question: FunctionComponent<Props> = ({
    visibleProp,
    setVisibleQuestion,
    id_contest,
    questions
}) => {


    const [dataTable, setDataTable] = useState<any[]>([]);
    const [getQuestion, { data }] = useMutation(questionOfContestMutation);

    useEffect(() => {
        if (!visibleProp) return;
        getQuestion({
            variables: {
                id_contest
            }
        });
    }, [visibleProp])

    useEffect(() => {
        console.log(data);

        if (!data || !questions) return;
        let { questionOfContest } = data;
        console.log(questionOfContest);
        
        questionOfContest = questionOfContest.map((q: any) => q.id)
        const qs =questions.map(q => {
            console.log(indexOf(questionOfContest, q.id) == -1 ? false : true, questionOfContest, q.id)
            return { 
                ...q,
                checked: indexOf(questionOfContest, q.id) == -1 ? false : true
            }
        })
        setDataTable(qs);
    }, [data, questions])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'timeStart',
            render: (v: any, i: any, index: any) => <>{index + 1}</>
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            // render: (username: any) => `${username}`
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            render: (answer: any) => `${renderAnswer(answer)}`
        },
        {
            title: 'Time',
            dataIndex: 'currentTime',
            key: 'time',
            // render: (email: any) => `${email}`
        },
        {
            title: '',
            dataIndex: '',
            key: 'more_Q',
            render: (value: any) => <JoinContest key={`checknox_q${value.id}`} checkProp={value.checked} id_question={value.id} id_contest={id_contest} />
        },
    ]

    return (
        <>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visibleProp ? true : false}
                onOk={() => setVisibleQuestion(false)}
                onCancel={() => setVisibleQuestion(false)}
                width={1000}
            >
                <Table 
                    columns={columns} dataSource={dataTable}
                 />
            </Modal>
        </>
    )

}

export default Question;