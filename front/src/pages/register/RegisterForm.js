import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingLabel, Card, Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';

function RegisterForm() {
    const navigate = useNavigate();

    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState('');
    //useState로 password 상태를 생성함.
    const [password, setPassword] = useState('');
    //useState로 confirmPassword 상태를 생성함.
    const [confirmPassword, setConfirmPassword] = useState('');
    //useState로 name 상태를 생성함.
    const [name, setName] = useState('');

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
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;
    // 이름이 2글자 이상인지 여부를 확인함.
    const isNameValid = name.length >= 2;

    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            // "register" 엔드포인트로 post요청함.
            await Api.post('user/register/', {
                email,
                password,
                name,
            });

            // 로그인 페이지로 이동함.
            navigate('/login');
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('회원가입에 실패하였습니다.', err);
        }
    };

    return (
        <Container fluid style={{ height: '100%', width: '70%' }}>
            <Row className="justify-content-md-center mt-5" style={{ fontWeight: '900', fontSize: '1.4em', color: 'white' }}>
                Sign up for more!
            </Row>
            <Row lg={8} className="justify-content-md-center mt-5" style={{ marginTop: '100px' }}>
                <Card>
                    <br />
                    <Col lg={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="registerEmail">
                                <FloatingLabel controlId="floatingInput" label="이메일 주소*" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        autoComplete="off"
                                        value={email}
                                        placeholder="이메일 주소"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    {!isEmailValid && (
                                        <Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>
                                    )}
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group controlId="registerPassword" className="mt-3">
                                <FloatingLabel controlId="floatingInput" label="비밀번호*" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        autoComplete="off"
                                        value={password}
                                        placeholder="비밀번호"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    {!isPasswordValid && (
                                        <Form.Text className="text-success">비밀번호는 4글자 이상으로 설정해 주세요.</Form.Text>
                                    )}
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group controlId="registerConfirmPassword" className="mt-3">
                                <FloatingLabel controlId="floatingInput" label="비밀번호 재확인*" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        autoComplete="off"
                                        value={confirmPassword}
                                        placeholder="비밀번호 재확인"
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                    {!isPasswordSame && (
                                        <Form.Text className="text-success">비밀번호가 일치하지 않습니다.</Form.Text>
                                    )}
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group controlId="registerName" className="mt-3">
                                <FloatingLabel controlId="floatingInput" label="이름*" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        value={name}
                                        placeholder="이름"
                                        onChange={e => setName(e.target.value)}
                                    />
                                    {!isNameValid && (
                                        <Form.Text className="text-success">이름은 2글자 이상으로 설정해 주세요.</Form.Text>
                                    )}
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button
                                        style={{ backgroundColor: '#2a3741', border: 'none' }}
                                        type="submit"
                                        disabled={!isFormValid}
                                        onClick={handleSubmit}>
                                        회원가입
                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button variant="light" onClick={() => navigate('/login')}>
                                        로그인하기
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <br />
                </Card>
            </Row>
        </Container>
    );
}

export default RegisterForm;
