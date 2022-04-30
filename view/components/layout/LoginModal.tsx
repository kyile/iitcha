import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Grid } from ".";
import { Button, Checkbox, Spinner, Text } from "../"
import { ModalStore, UserInfoStore } from "../../common/store";
import { stringToHashCode, alert } from "../../common/utility";
import Modal from "../Modal";

const LoginModal = () => {
    // store
    const { setUserInfo } = UserInfoStore.useStore();
    const { hideModal } = ModalStore.useStore();

    // state
    const [id, setId] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>();
    const [rememberID, setRememberID] = useState<boolean>();
    const [validate, setValidate] = useState<boolean>(false);

    useEffect(() => {
        initialize();
    }, []);

    // login modal 초기화
    const initialize = () => {
        // localStorage에 ID 저장되어 있는 지 확인 후 ID 설정
        if (localStorage !== undefined) {
            const id = localStorage.getItem("rememberID");

            // 저장된 id가 있을 경우
            if (id !== null) {
                setId(id);
                setRememberID(true);
            }
        }
        setPassword(undefined);
        setValidate(false);
    }

    // login modal id change event handler
    const handleIdChange = (id?: string, value?: string) => {
        if (value !== undefined) {
            setId(value);
            if (validate === false && value.length > 0) setValidate(true);
        }
    }

    // login modal password change event handler
    const handlePasswordChange = (id?: string, value?: string) => {
        if (value !== undefined) {
            setPassword(value);
            if (validate === false  && value.length > 0) setValidate(true);
        }
    }

    // rememberId check change event hanlder
    const handleRememberID = (id?: string, checked?: boolean) => {
        setRememberID(checked);
    }

    // login
    const handleLogin = async () => {
        setLoading(true);
        try {
            localStorage.removeItem("rememberID");

            if (id !== undefined && password !== undefined) {
                // Remember ID가 check되어 있을 시 localStorage에 id 저장
                if (rememberID && localStorage !== undefined) localStorage.setItem("rememberID", id);
                // Back-end 개발 후 수정 필요
                const result = await axios.get(`/api/login?id=${stringToHashCode(id)}&password=${stringToHashCode(password)}`);

                switch (result.status) {
                    case 200 : {
                        setUserInfo(result.data);
                        console.log(result.data);
                        hideModal("login");
                        alert("login success!", "success");
                    } break;

                    case 401: {
                        console.log(result.data.message);
                    } break;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && id !== undefined && password !== undefined) handleLogin();
    }

    return (
        <Modal id="login" onClose={initialize}>
            <Modal.Header>
                Login
            </Modal.Header>
            <Modal.Body>
                <div onKeyUp={handleKeyUp}>
                    <Container>
                        <Grid direction="row">
                            <Text
                                id="id"
                                label="ID"
                                value={id}
                                required
                                validate={validate}
                                onChange={handleIdChange}
                            />
                        </Grid>
                        <Grid direction="row">
                            <Text 
                                id="password"
                                label="Password"
                                type="password"
                                required
                                validate={validate}
                                value={password}
                                invalidFeedBack="input password"
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid direction="row" justifyContents="between">
                            <Grid direction="col" size={6}>
                                <Checkbox
                                    id="rememberId"
                                    label="Remember ID"
                                    checked={rememberID}
                                    onChange={handleRememberID}
                                />
                            </Grid>
                            <Grid direction="col" size={6}>
                                <p className="text-end">
                                    Forgot your password?
                                </p>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Grid direction="row">
                        <Button
                            id="login"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner size="sm"/>
                            ) : ("login")}
                        </Button>
                    </Grid>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;