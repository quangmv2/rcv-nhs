import React, { memo } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div>
            Home Page
            <Link to="/login">Login</Link>
        </div>
    )
}

export default memo(Home);