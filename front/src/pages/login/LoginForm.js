import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Col, Row, Form, Button } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

import * as Api from '../../api';
import { DispatchContext } from '../../App';
import { UserStateContext } from '../../App';
import '../../static/font.css';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    const userState = useContext(UserStateContext);

    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState('');
    //useState로 password 상태를 생성함.
    const [password, setPassword] = useState('');

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = email => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    //
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            // "user/login" 엔드포인트로 post요청함.
            const res = await Api.post('user/login', {
                email,
                password,
            });

            // 유저 정보는 response의 data임.
            const user = res.data;
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem('userToken', jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user,
            });

            // 기본 페이지로 이동함.
            navigate('/', { replace: true });
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('로그인에 실패하였습니다.\n', err);
        }
    };

    useEffect(() => {
        console.log(userState);
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        } else {
            navigate(`/user/${userState.user._id ?? userState.user.id}`);
        }
    }, [userState, navigate]);

    return (
        <Container fluid style={{ height: '100%' }}>
            <Row className="align-items-center" style={{ marginTop: '100px' }}>
                <Col sm={6} className="d-flex align-items-center flex-column">
                    <Row className="d-flex align-items-center">
                        <Typography
                            variant="h1"
                            style={{
                                fontFamily: 'BMKIRANGHAERANG',
                                color: 'white',
                                textShadow: '-5px 0px #576069, 0px 5px #576069, 5px 0px #576069, 0px -5px #576069',
                            }}>
                            Forefolio.com
                        </Typography>
                    </Row>
                    <Row className="d-flex align-items-center text-center">
                        <Typography style={{ color: 'white' }}>
                            Let’s start the first step on your Odyssey as developer. <br />
                            It might be a long and hard journey. <br />
                            But with Forefolio, you can do it!
                            <br />
                            <br />
                            개발자 오딧세이의 첫 걸음을 시작해보세요.
                            <br />
                            길고 힘든 여정이 될 수도 있겠지만,
                            <br />
                            Forefolio와 함께라면 할 수 있습니다!
                        </Typography>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Card style={{ width: '70%' }}>
                        <Row className="justify-content-md-center mt-5">
                            <Col lg={8}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="loginEmail">
                                        <Form.Label>
                                            <Typography style={{ fontFamily: 'BMKIRANGHAERANG', color: '#576069' }}>
                                                이메일 주소
                                            </Typography>
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            autoComplete="on"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        {!isEmailValid && (
                                            <Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>
                                        )}
                                    </Form.Group>

                                    <Form.Group controlId="loginPassword" className="mt-3">
                                        <Form.Label>
                                            <Typography style={{ fontFamily: 'BMKIRANGHAERANG', color: '#576069' }}>
                                                비밀번호
                                            </Typography>
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            autoComplete="on"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        {!isPasswordValid && (
                                            <Form.Text className="text-success">비밀번호는 4글자 이상입니다.</Form.Text>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Row} className="mt-3 text-center">
                                        <Col sm={{ span: 20 }}>
                                            <Button
                                                style={{ backgroundColor: '#2a3741', border: 'none' }}
                                                type="submit"
                                                disabled={!isFormValid}
                                                onClick={e => handleSubmit(e)}>
                                                로그인
                                            </Button>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mt-3 text-center">
                                        <Col sm={{ span: 20 }}>
                                            <Button className="mb-3" variant="light" onClick={() => navigate('/register')}>
                                                회원가입하기
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
