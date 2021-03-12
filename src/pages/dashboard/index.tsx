import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Form, Row, Col, } from 'antd';
import "./dashboard.scss";
import _ from 'lodash';
import fstPlace from "../../assets/MedalIcon/1st-place.svg";
import sndPlace from "../../assets/MedalIcon/2nd-place.svg";
import trdPlace from "../../assets/MedalIcon/3rd-place.svg";

import  Fields from "./ymmy-data";

const Home = (props: { data: any }) => {
    const [medalImage, setMedalImage] = useState(fstPlace);
    const { data } = props;
    const rank = props;
    const renderRank = () => {
        return _.map(Fields, ({ rank, name}) => {
         
            return (
                <tr>
                    <td className="rank"> {rank}
                        {rank == 1 ?  <img  className='medal' src={fstPlace} />: <></>}
                        {rank == 2 ?  <img  className='medal' src={sndPlace} />: <></>}
                        {rank == 3 ?  <img  className='medal' src={trdPlace} />: <></>}
                       </td>
                    <td className="name">Spain</td>
                    <td className="points">1460</td>
                    <td className="up-down">0</td>
                </tr>

            );
        });
    }

    return (

        <div className="container">
            <header>
                <h1>RANKING</h1>
            </header>
            <div className="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                   { renderRank() }
               
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Home);