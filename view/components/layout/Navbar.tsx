import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Button, Grid, Text, Container } from ".."
import { CommonStore, ModalStore, UserInfoStore } from "../../common/store";
import { IconButton } from "../button";
import Iitcha from "../../public/Iitcha.svg";
import PersonCircle from "../../public/icons/PersonCircle.svg";

// Navbar Props
type Props = {
    children: React.ReactElement<typeof Item> | React.ReactElement<typeof Item> [];
}

// Navbar.Item Props
type ItemProps = {
    path: string;
    disabled?: boolean;
    children?: string;
}

// Navbar
const Navbar = (props: Props) => {
    const { showModal } = ModalStore.useStore();
    const { userInfo } = UserInfoStore.useStore();

    const { children } = props;
    const [search, setSearch] = useState<string>();

    const handleSearchChange = (id?: string, value?: string) => {
        if (value !== undefined) setSearch(value)
    }

    const handleSearch = () => {
        /*
        ** TO-DO
        ** 검색 기능 추가
        */
        console.log("Search button clicked");
    }

    const handleSignUp = () => {
        /*
        ** TO-DO
        ** 회원가입 기능 추가
        */
    }

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && search !== undefined) handleSearch();
    }

    const handleLogin = () => {
        showModal("login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" onKeyUp={handleKeyUp}>
            <Container>
                <Link href="/">
                    <a className="navbar-brand" href="/">
                        {/* <Iitcha /> */}
                        Iitcha
                    </a>
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {children}
                    </ul>
                </div>
                <Text
                    id="search"
                    placeholder="검색어를 입력하세요."
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button
                    id="search"
                    type="success"
                    onClick={handleSearch}
                >
                    검색
                </Button>
                {userInfo === undefined ? (
                    <>
                        <Button
                            id="loginButton"
                            type="light"
                            onClick={handleLogin}
                        >
                            로그인
                        </Button>
                        <Button
                            id="signUpButton"
                            type="primary"
                            onClick={handleSignUp}
                        >
                            회원가입
                        </Button>
                    </>
                ) :
                (
                    <IconButton
                        id="userInfoButton"
                        onClick={()=>{}}
                    >
                        <PersonCircle fill="grey"/>
                    </IconButton>
                )
            }
            </Container>
        </nav>
    );
}

// Navbar.Item
const Item = (props: ItemProps) => {
    const currentPath = CommonStore.useStore(state => state.path);
    const { path, children } = props;

    const active =  currentPath === path;
    const disabled = props.disabled ?? false;
    const className = `nav-link ${active ? "active" : ""} ${disabled ? "disabled" : ""}`;

    return (
        <li className="nav-item" key={path}>
            <Link href={path}>
                <a className={className} href={path}>
                {children}
                </a>
            </Link>
        </li>
    );
}

Navbar.Item = Item; 
export default Navbar;