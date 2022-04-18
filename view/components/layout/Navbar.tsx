import React, { useContext, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Button, Grid, Text, Container } from ".."
import { ModalContext, PathContext, UserContext } from "../../common/context";

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
    const modal = useContext(ModalContext);
    const user = useContext(UserContext);

    const { children } = props;
    const [search, setSearch] = useState<string>();

    const handleSearchChange = (id?: string, value?: string) => {
        if (value !== undefined) setSearch(value)
    }

    const handleSearch = () => {
        /* TO-DO
         * 검색 기능 추가
        */
        console.log("Search button clicked");
    }

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && search !== undefined) handleSearch();
    }

    const handleLogin = () => {
        modal.showModal("login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" onKeyUp={handleKeyUp}>
            <Container>
                <Link href="/">
                    <a className="navbar-brand" href="/">
                        <Image
                            src="/Iitcha.svg"
                            alt="logo"
                            width={30}
                            height={30}
                        />
                        Iitcha
                    </a>
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {children}
                    </ul>
                </div>
                <Grid direction="row">
                    <Grid direction="col" size={11}>
                        <div className="input-group">
                            <Text
                                id="search"
                                placeholder="검색어를 입력하세요."
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <Button
                                id="search"
                                onClick={handleSearch}
                            >
                                검색
                            </Button>
                        </div>
                    </Grid>
                    <Grid direction="col" size={1}>
                        <Button
                            id="loginButton"
                            onClick={handleLogin}
                        >
                            in
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </nav>
    );
}

// Navbar.Item
const Item = (props: ItemProps) => {
    const currentPath = useContext(PathContext);
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