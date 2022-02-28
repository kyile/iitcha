import React, { useEffect } from "react";

type Props = {
    children: JSX.Element[];
}

const Modal = (props: Props) => {
    const { children } = props;

    // Modal에 Modal.Header, Modal.Body, Modal.Footer 외의 component가 있을 시 error
    useEffect(() => {
        const childrenTypes = children.map((child) => child.type.name);
        children.forEach((child) => {
            const type = child.type.name;
            if(type !== "Header" && type !== "Body" && type !== "Footer") {
                throw new Error(`Modal can only has Modal.Header, Modal.Body, Modal.Footer in children: ${type}`);
            }

            // 하위 component 별로 중복 있을 시 error
            if(childrenTypes.filter((typeCurrent) => typeCurrent === type).length != 1) {
                throw new Error(`${type} can be only one in Modal`);
            }
        });
    }, [children]);

    return (
        <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

const Header = (props: {children: JSX.Element | JSX.Element[] | string}) => {
    const { children } = props;
    return (
        <div className="modal-header">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    );
}

const Body = (props: {children: JSX.Element | JSX.Element[] | string}) => {
    const { children } = props;
    return (
        <div className="modal-body">
            {children}
        </div>
    );
}

const Footer = (props: {children: JSX.Element | JSX.Element[] | string}) => {
    const { children } = props;
    return (
        <div className="modal-footer">
            {children}
        </div>
    );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
export default Modal;