import React from "react";
import Image from "next/Image";

type Props = {
    id: string;
    title?: string;
    image?: string;
    isLoading?: boolean;
    children?: string;
}

const Card = (props: Props) => {
    const { id, title, children } = props;
    const image = props.image ?? "...";
    const isLoading = props.isLoading ?? false;

    return (
        <div id={id} className="card m-1">
            {isLoading ? (
                <>
                    <div className="card-img-top" style={{background: "lightgrey", minHeight: "150px", minWidth: "200px"}}/>
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <Image src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}
                        </h5>
                        <p className="card-text">
                            {children}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;