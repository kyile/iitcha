import React from "react";
import { Button, Dropdown } from ".";

type Props = {
    children: React.ReactElement<typeof Button | typeof Dropdown> | React.ReactElement<typeof Button | typeof Dropdown>[];
}

const ButtonGroup = (props: Props) => {
    const { children } = props;

    return (
        <div className="btn-group">
            {children}
        </div>
    );
}

export default ButtonGroup;