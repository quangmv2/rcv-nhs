import React, { FunctionComponent, memo, useEffect } from "react";
import { useStore } from "store";

const Public = (props: any) => {

    const { auth } = useStore()

    return(
        <div>
            {props.children}
        </div>
    )
}

export default memo(Public);