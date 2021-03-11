import React, { memo, useEffect, useState } from "react";
import Question from "./question";
import { Table, Row, Col, message, } from 'antd';
import './contest.scss';
import Answer from "./answer";
import Counter from "./counter";
import { useLogin, useListenQuestion } from "../../util";
import { useMutation, useQuery } from "@apollo/client";
import { chooseAnswer, getContest, questionOfContestMutation } from "../../graphql";
import { useStore } from "../../store";
import Countdown from "antd/lib/statistic/Countdown";
import { useParams } from "react-router-dom";

export enum EnumListenContest {
    NEXT = "NEXT",
    ANSWER = "ANSWER",
    WAITTING_QUESTION = "WAITTING_QUESTION",
    QUESTION = "QUESTION",
    END = "END",
    STOP = "STOP"
}

// const id_contest = "604a1c78ec728268e54eaf79";

const Home = () => {

    const { id }: any = useParams();
    const { data } = useListenQuestion("id", "");
    const [question, setQuestion] = useState<any>()
    const [time, setTime] = useState<number>(0);
    const [waittingNext, setWaittingNext] = useState<boolean>(false);
    const [answer, setAnswer] = useState<number | null>();
    const [myChoose, setMyChoose] = useState<number | null>(null)
    const [pushAnswer, { }] = useMutation(chooseAnswer)
    const { auth } = useStore();
    const [fetchContest, { data: dbContest }] = useMutation(getContest);
    const [countDown, setCountDown] = useState<number>(0);

    useEffect(() => {
        if (!dbContest || !dbContest.contest) return;
        setCountDown(dbContest.contest.timeStart);
    }, [dbContest])

    useEffect(() => {
        if (!id) return;
        fetchContest({
            variables: {
                id_contest: id
            }
        })
    }, [id]);

    useEffect(() => {
        // console.log(data);
        if (!data) return;
        const { listenContestStart } = data;
        switch (listenContestStart.type) {
            case EnumListenContest.QUESTION:
                questionHandler(listenContestStart)
                setWaittingNext(false)
                break;
            case EnumListenContest.WAITTING_QUESTION:
                setTime(Math.floor(listenContestStart.time / 1000))
                setWaittingNext(true)
                break;
            case EnumListenContest.ANSWER:
                answerHandler(listenContestStart)
                break;
            case EnumListenContest.NEXT:
                setAnswer(null);
                setMyChoose(null);
                setWaittingNext(false);
                break;
            case EnumListenContest.STOP:
                message.warn("Stop")
                break;
            default:
                break;
        }
    }, [data]);

    const questionHandler = (listenContestStart: any) => {
        const { question, time } = listenContestStart;
        setTime(Math.floor(time / 1000))
        setQuestion(question)
        // console.log(time);
    }

    const answerHandler = (listenContestStart: any) => {
        const { answer } = listenContestStart;
        setAnswer(answer.answer);
        // console.log(time);
    }

    const chosse = async (answer: number) => {
        console.log(auth);
        if (!auth || !auth.user.id || !question) return;
        console.log(auth);
        pushAnswer({
            variables: {
                id_question: question.id,
                id_contest: id,
                answer
            }
        }).then(data => {
            console.log(data);
            if (data.data.answer != -1) setMyChoose(data.data.answer);
        }).catch(err => console.log(err))
    }

    return (
        <Row>
            <Col span={20}> <div className='container'>
                <Countdown value={countDown} />
                <Question question={question} />
                <Answer
                    answers={question ? question.answers : null}
                    correct={answer}
                    answering={myChoose}
                    setChoose={chosse}
                />
            </div>  </Col>
            <Col span={4}><Counter time={time} /></Col>
        </Row>
    )
}

export default memo(Home);