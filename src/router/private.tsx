import React, { FunctionComponent, memo } from "react";
import { useStore } from "../store";

const Private = ({
    children
}: any) => {

    const { auth } = useStore()
    return(
        <>
            {children}
        </>
    )
}

export default memo(Private);