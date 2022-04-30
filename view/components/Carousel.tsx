import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "./button";
import LeftArrowFill from "../public/icons/LeftArrowFill.svg";
import RightArrowFill from "../public/icons/RightArrowFill.svg";
import Circle from "../public/icons/Circle.svg";
import CircleFill from "../public/icons/CircleFill.svg";

type Props = {
    id: string;
    children: JSX.Element | JSX.Element[];
    showNav?: boolean;
}

const Carousel = (props: Props) => {
    // props
    const { id, children } = props;
    const showNav = props.showNav ?? true;

    // state
    const [index, setIndex] = useState<number>(0);

    // ref
    const itemContainerRef = useRef<HTMLDivElement>(null);

    // variables
    const indexCount = Array.isArray(children) ? children.length : 1;

    // index 값 변경 시
    useEffect(() => {
        // Carousel 스크롤을 이동
        if (itemContainerRef.current !== null) itemContainerRef.current.style.transform = `translate(-${index * (100 / indexCount)}%)`;
    }, [index]);

    // left Button click event handler
    const handleLeftButtonClick = () => {
        // index 값이 0이 아닐 경우 현재 index 값 --
        if (index !== 0) setIndex(index - 1);
    }

    // right Button click event handler
    const handleRightButtonClick = () => {
        // index 값이 마지막 값이 아닐 경우 현재 index 값 ++
        if (index !== (indexCount - 1)) setIndex(index + 1);
    }

    // render Carousel items
    const renderItems = () => {
        // 배열일 경우
        if (Array.isArray(children)) return children.map((child, i) => (
            <div key={i} style={{width: `${100 / indexCount}%`, float: "left"}}>
                {child}
            </div>));
        // 배열이 아닐 경우
        else return (
            <div style={{width: "100%", float:"left"}}>
                {children}
            </div>);
    }

    // render Carousel navigation
    const renderNav = () => {
        return Array(indexCount).fill(<></>).map((v, i) => {
            const id = String(i);
            const handleClick = (id?: string) => {
                setIndex(Number(id));
            };
            // 현재 선택된 index일 경우 CircleFill, 선택된 index가 아닐 경우 Circle
            const icon = i === index ? <CircleFill fill="grey" width="14" height="14" opacity="0.6"/> : <Circle fill="grey" width="14" height="14" opacity="0.6"/>;

            return (
                <IconButton
                    id={id}
                    key={id}
                    onClick={handleClick}
                >
                    {icon}
                </IconButton>
            );
        });
    }

    return (
        <div
            id={id}
            className="position-relative overflow-hidden m-3"
            style={{minHeight: "300px"}}
        >
            {(index !== 0) && (
                <div
                    id="leftButtonContainer"
                    className="position-absolute top-50 start-0 translate-middle-y"
                    style={{zIndex: "1000"}}
                >
                    <IconButton id="leftButton" onClick={handleLeftButtonClick}>
                        <LeftArrowFill fill="grey" opacity="0.6"/>
                    </IconButton>
                </div>
            )}
            <div
                id="itemContainer"
                ref={itemContainerRef}
                style={{width: `${indexCount * 100}%`, transition: "transform 0.6s"}}
            >
                {renderItems()}
            </div>
            {(index !== (indexCount - 1)) && (
                <div
                    id="rightButtonContainer"
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{zIndex: "1000"}}
                >
                    <IconButton id="rightButton" onClick={handleRightButtonClick}>
                        <RightArrowFill fill="grey" opacity="0.6"/>
                    </IconButton>
                </div>
            )}
            {showNav && (
                <div
                    id="carouselNavContainer"
                    className="position-absolute start-50 bottom-0 translate-middle-x zindex-tooltip"
                    style={{display: "flex", flexDirection: "row"}}
                >
                    {renderNav()}
                </div>
            )}
        </div>
    )
}

export default Carousel;