import React, { memo, useEffect, useState } from "react";
import Question from "./question";
import { Table, Row, Col, message, Image, Modal, Result, Button, } from 'antd';
import './contest.scss';
import Answer from "./answer";
import Counter from "./counter";
import { useLogin, useListenQuestion } from "../../util";
import { useMutation, useQuery } from "@apollo/client";
import { chooseAnswer, getContest, questionOfContestMutation } from "../../graphql";
import { useStore } from "../../store";
import Countdown from "antd/lib/statistic/Countdown";
import { useHistory, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { renderAnswer } from "pages/admin/questions";

import { RightCircleOutlined } from '@ant-design/icons';
import { HOST } from "../admin/users/UserForm";

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
    const { data } = useListenQuestion(id, "");
    const [question, setQuestion] = useState<any>()
    const [time, setTime] = useState<number>(0);
    const [waittingNext, setWaittingNext] = useState<boolean>(false);
    const [answer, setAnswer] = useState<number | null>();
    const [myChoose, setMyChoose] = useState<number | null>(null)
    const [pushAnswer, { }] = useMutation(chooseAnswer)
    const { auth } = useStore();
    const [fetchContest, { data: dbContest }] = useMutation(getContest);
    const [countDown, setCountDown] = useState<number>(0);
    const [total, setTotal] = useState<any[]>([0, 0])
    const [reject, setReject] = useState<boolean>(false);
    const [sum, setSum] = useState<number>(-1);
    const history = useHistory()

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
        }).catch(err => console.log(err))
    }, [id]);

    useEffect(() => {
        // console.log(data);
        if (!data) return;
        const { listenContestStart } = data;
        switch (listenContestStart.type) {
            case EnumListenContest.QUESTION:
                questionHandler(listenContestStart)
                // setTotal([listenContestStart.doing, listenContestStart.total])
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
                const { total, doing } = listenContestStart;
                setTotal([doing, total])
                message.success(`C??u s??? ${doing}`)
                break;
            case EnumListenContest.END:
                message.success("Cu???c thi ???? k???t th??c. M???i b???n xem k???t qu??? t???i trang ch??nh")
                setTimeout(() => {
                    history.push(`/dashboard/${id}`)
                }, 3000);
                break;
            default:
                break;
        }
    }, [data]);

    const questionHandler = (listenContestStart: any) => {
        const { question, time, doing, total } = listenContestStart;
        setTime(Math.floor(time / 1000))
        setQuestion(question)
        setTotal([doing, total])
        // console.log(time);
    }

    const answerHandler = (listenContestStart: any) => {
        const { answer } = listenContestStart;
        setAnswer(answer.answer);
        if (!auth || !auth.user.id) {
            message.success(`C??u tr??? l???i ????ng ${renderAnswer(answer.answer)}`)
            return;
        };
        console.log(myChoose, answer.answer);
        
        if (myChoose != answer.answer && sum == -1) {
            setSum(total[0] - 1);
            message.error("B???n ???? tr??? l???i sai");
            setTimeout(() => {
                setReject(true);
            }, 3000)
        } else
        message.success(`C??u tr??? l???i ????ng ${renderAnswer(answer.answer)}`)
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
            else message.warning("B???n kh??ng c?? quy???n truy c???p")
        }).catch(err => message.warning("B???n kh??ng c?? quy???n truy c???p"))
    }

    return (
        <Row>
            <Col span={20}> <div className='container-contest'
            // style={{
            //     backgroundImage: "/quandoan.png"
            // }}
            >
                <Countdown value={countDown} />
                <Question total={total} question={question} />
                <Answer
                    answers={question ? question.answers : null}
                    correct={answer}
                    answering={myChoose}
                    setChoose={chosse}
                />
            </div>
            </Col>
            <Col span={4} className='counter'>

                {
                    auth && auth.user && <>
                        <Image
                            width={100}
                            height={100}
                            style={{
                                borderRadius: "100%"
                            }}
                            src={`${HOST}/image-download?id=${auth.user.image}`}
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEXo6OhgYGDv7+9ycnLr6+tZWVldXV1VVVVaWlphYWFSUlLm5ubQ0NCCgoJ7e3vg4OCdnZ1nZ2e4uLjS0tKXl5empqaurq6goKCOjo7JycnCwsLa2tpwcHC+vr6pqamxsbGJiYlWM1ywAAAEQ0lEQVR4nO2c23qqMBBGMUwIghxVBPH0/k+5CWhbu62FYIPD96+79or1zTATQyaOAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAhROIG0dQP83pIhOt8V0axG0flLl87YlaSJJIi9pT0vQ5fqmVUJLORJNpHgfQW93gyiKpZZCuJY6a+610lVbbnH0excn/w6xzdtZj6EUdBtHni1zmmnFOV6oN86qeRbsJWUVT+8wBew+itmGaq2Ac9/NpMrVgqiqPqJ9igKoaJSlXPCLbImp0i1b/XmK+JukimfuKh0KFPkfnEj5m9iiIdFMIGdWKlSKv+VeYGr1dRuMNyVONFjIJIAxrFJ5xahkkIWQWRKpMQLhYBmzdRXExC2HSMlEsQk6Gd4gMmMaTc1JBLrRGlWZI2abrjkabC0K+ppi4Pw3rIj4p7FIsspb1Zr2gN1xwUqTAupQu552AoUt/c8MzCsBxhuOVhaNosuKxqxsTQ37Aw3MzecDfCkMWihk4jukXBodLQce79kNZzX9M4ZG4oWQg6IjZtiB6TbWGxNS2mPJY0ZtvBHWrFw9ChzEzQy3gkqU5Ts34h+Xy6SMzSVPH5wma2+OaxKO2g2ui7BZ8Qmnw+1K2CTwg1y6GCXsakU1yhvidNPgiY7Hd/IDbD8lSx+GV4B8VD6qnP59vhF7L+C3DfZZaiLZT0VvQPIUdDrdgvUSVTwUYxjPuUG3VxmAo6uvP/coBWH0xk1um/Iarl8zDKjOvh0htEW//nt1F6Bf+j7I5IUvnfLEKbn9LbhcwDeEU4ZzeQd5HUQyVxTvPw05Co8zKTSnYomW2O8xmZ6dBjXcnqmJ+Lc35ch2JmejfoxtQPAgAALKHrEHD7x3UUeCYVVZuRU1f5Nr3EbrbUZG58Sbd5VTvEe+i5a/J5GmVKNasZPQR8W7PpUWDZ/DeL0rxt//w0GztndW4Xak8n9PT6VB7Ks57tZmTZxG51irxf5O41vahY81jKNcFL8rKxG/ql25NqUb7/crz5DXFyh9vdaF7OuKjfV1LfK3D4f/B+aCgD903vIiCxjx7/lh8uKS/V2zmK8PTTvQJGkiornHfaABDhzjM/6vXYUS62b7OJ0/jJF/u1SO/0FlvFRMWr4/fpuMynXweIKvsrP41yJ94wpvASvK6+PMILNlOGUVRL8/PAfZHZdNefiNMfB7DDC/KJFMXG/CDpMCb6yE/RX5aYb4pTHJcSFgUbxdK6oihtCk6QqOJsPmRoRmD3GP/Am0teQ2jTUEQ22sQ90ma1oZXtHNUEFk9nThFCuydsDU85j2VpTdD8SoFx2LuQYMyE4RjsTbaZj/2Mw96LaHb9zHjsXWAzmaG1SyVgCEMYwhCGMIQhDGEIQxjCEIYwhCEMYfg2hpPg2zOMDu4UHOyNtIupsCUIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0/EPnPZE8QSXkhUAAAAASUVORK5CYII="
                        // fallback="data:image/png;base64,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"
                        />
                        <p
                            style={{
                                // textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "bold"
                            }}
                        >{auth.user.firstname} {auth.user.lastname}</p>
                    </>
                }
                <Counter
                    time={time}
                />
            </Col>
            <Modal
                visible={reject}
                centered
                footer={null}
            >
                <Result
                    status="success"
                    title="Ch??c m???ng b???n ???? ho??n th??nh"
                    subTitle={`C??u tr??? l???i ????ng c???a b???n ${sum}/${total[1]}`}
                    extra={[
                        <Button type="primary" key="console" onClick={() => setReject(false)}>
                            Ti???p t???c theo d??i
                        </Button>,
                        <Button key="buy"
                            onClick={() => history.push(`/dashboard/${id}`)}
                        >
                            Xem b???ng x???p h???ng
                        </Button>,
                    ]}
                />
            </Modal>
        </Row>
    )
}

export default memo(Home);