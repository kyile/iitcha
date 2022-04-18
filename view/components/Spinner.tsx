import React from "react";
import { Size } from "../common/utility";

type Props = {
    size?: Size;
}

const Spinner = (props: Props) => {
    const size = props.size ?? "md";
    const className = `spinner-border spinner-border-${size}`;

    return (
        <div className={className} role="status"/>
    );
}

export default Spinner;