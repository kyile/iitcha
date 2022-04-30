import React, { useEffect } from "react";
import { ModalStore } from "../common/store";

// Modal Props
type Props = {
    id: string;
    blur?: boolean;
    onClose?: (id?:string) => void;
    children: React.ReactElement<typeof Header | typeof Body | typeof Footer>[];
}

// Modal.Header Props
type HeaderProps = {
    id?: string;
    children: JSX.Element | JSX.Element[] | string;
}

// Modal.Body Props
type BodyProps = {
    id?: string;
    children: JSX.Element | JSX.Element[] | string;
}

// Modal.FooterProps
type FooterProps = {
    id?: string;
    children: JSX.Element | JSX.Element[] | string;
}

const Modal = (props: Props) => {
    const { id, blur, onClose, children } = props;
    const blurProps = blur ? {} : { "data-bs-backdrop": "static", "data-bs-keyboard": "false" };

    const Header = children.filter((child) => String((child as JSX.Element).type.name) === "Header");
    const Body = children.filter((child) => String((child as JSX.Element).type.name) === "Body");
    const Footer = children.filter((child) => String((child as JSX.Element).type.name) === "Footer");

    useEffect(() => {
        if (typeof document !== "undefined" && onClose !== undefined) {
            const modalEl = document.getElementById(id);

            if (modalEl !== null) {
                modalEl.addEventListener("hide.bs.modal", () => {
                    onClose(id);
                });
            }
        }
    }, []);

    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby="modalLabel"
            aria-hidden="true"
            {...blurProps}
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    {Header}
                    {Body}
                    {Footer}
                </div>
            </div>
        </div>
    );
}

const Header = (props: HeaderProps) => {
    const { children } = props;

    return (
        <div className="modal-header">
            <h5 className="modal-title">
                {children}
            </h5>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            />
        </div>
    );
}

const Body = (props: BodyProps) => {
    const { children } = props;

    return (
        <div className="modal-body">
            {children}
        </div>
    );
}

const Footer = (props: FooterProps) => {
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