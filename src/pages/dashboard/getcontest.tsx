import { useQuery } from "@apollo/client";
import { contests } from "../../graphql";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../contest/contests.scss";
import { useStore } from "../../store";

const Contest = ({
    contest
}: any) => {

    const history = useHistory();
    const { auth } = useStore()

    return (
        <div
            className="contest-box"
        >
            <div
                onClick={() => {
                    history.push(`/dashboard/${contest.id}`);
                }}
            >
                <p>{contest.name}</p>
            </div>
        </div>
    )

}

const Contests = () => {

    const { data, loading } = useQuery(contests);

    return (
        <div className="contests-page">
            <h1 className="title">Cuộc Thi</h1>
            <div
                className="contests-container"
            >
                {
                    data && data.contests.map((c: any) => (
                        <Contest contest={c} />
                    ))
                }
            </div>
        </div>
    )
}

export default Contests;