import React from "react";

const Container = (props: {children: JSX.Element[] | JSX.Element}) => {
    const { children } = props;
    return (
        <div className="container-fluid">
            {children}
        </div>
    );
}

export default Container;