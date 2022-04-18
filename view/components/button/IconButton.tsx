import React from "react";
import { Size } from "../../common/utility";

type Props = {
    id: string;
    children: SVGElement;
    disabled?: boolean;
    size?: Size;
    onClick: (id?: string) => void;
}

const IconButton = (props: Props) => {
    const { id, children, onClick } = props;

    // Button click event handler
    const handleClick = () => {
        onClick(id);
    }

    return (
        <div id={id} className="pe-auto" onClick={handleClick}>
            {children}
        </div>
    )
}

export default IconButton;