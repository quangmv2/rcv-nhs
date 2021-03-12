import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Form, Row, Col, } from 'antd';
import "./dashboard.scss";
import _ from 'lodash';
import fstPlace from "../../assets/MedalIcon/1st-place.svg";
import sndPlace from "../../assets/MedalIcon/2nd-place.svg";
import trdPlace from "../../assets/MedalIcon/3rd-place.svg";

// import  Fields from "./ymmy-data";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { listenResult, resultGQL } from "../../graphql";

const renderRank = (Fields: any[]) => {
    return _.map(Fields, (value, index: number) => {

        return (
            <tr>
                <td className="rank"> {index + 1}
                    {index + 1 == 1 ? <img className='medal' src={fstPlace} /> : <></>}
                    {index + 1 == 2 ? <img className='medal' src={sndPlace} /> : <></>}
                    {index + 1 == 3 ? <img className='medal' src={trdPlace} /> : <></>}
                </td>
                <td className="name">Spain</td>
                <td className="points">1460</td>
                <td className="up-down">0</td>
                <td className="up-down">0</td>
                <td className="up-down">0</td>
            </tr>

        );
    });
}

const Home = (props: { data: any }) => {

    const { id }: any = useParams()
    const [medalImage, setMedalImage] = useState(fstPlace);
    const [getResults,{ data: dtResult }] = useMutation(resultGQL);
    const { data } = useSubscription(listenResult, {
        variables: {
            id_contest: id
        },
        shouldResubscribe: true,
        // skip: true,
        onSubscriptionComplete: () => {
            console.log("Sub ok");
        },

    })
    const [dataRank, setDataRank] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;
        getResults({
            variables: {
                id_contest: id
            }
        }).then(() => {

        }).catch(err =>{
            console.log(err)
        })
    }, [id])

    useEffect(() => {
        if (!data || !data.listenResult ) return;
        const { listenResult } = data;
        setDataRank(listenResult)
    }, [data]);

    useEffect(() => {
        if (!dtResult || !dtResult.result) return;
        const { result } = dtResult;
        setDataRank(result)
    }, [dtResult])

    // const { data } = props;
    // const rank = props;
    return (

        <div className="container-rank">
            <header>
                <h1>RANKING</h1>
            </header>
            <div className="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Xếp hạng</th>
                            <th>Họ và tên</th>
                            <th>Ảnh</th>
                            <th>Đơn vị</th>
                            <th>Điểm</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRank(dataRank)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Home);