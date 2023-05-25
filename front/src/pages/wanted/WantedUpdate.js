import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function WantedUpdate() {
    const navigate = useNavigate();
    const [wantedTitle, setWantedTitle] = useState('');
    const [wantedContent, setWantedContent] = useState('');

    const userState = useContext(UserStateContext);
    const { state } = useLocation();
    const { wanted } = state;
    const modifiedWanted = { ...wanted, wantedTitle, wantedContent };

    const onChangeTitle = e => {
        setWantedTitle(e.target.value);
    };

    const onChangeContent = e => {
        setWantedContent(e.target.value);
    };

    const handleEdit = async () => {
        try {
            const wantedId = wanted._id;
            // "/wanted/wantedId" 엔드포인트로 put요청함.(userId는 req.currentUserId 사용)
            await Api.put(`wanted/${wantedId}`, {
                wantedTitle,
                wantedContent,
            });
            navigate('/wanted/read', { state: { wanted: modifiedWanted } });
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('팀원구하기 정보 추가에 실패하였습니다.', err);
        }
    };

    const handleDelete = async () => {
        try {
            const wantedId = wanted._id;

            // "/wanted/wantedId" 엔드포인트로 delete요청함.(userId는 req.currentUserId 사용)
            await Api.delete(`wanted/${wantedId}`);

            navigate('/wanted');
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }

            console.log('팀원구하기 정보 삭제에 실패하였습니다.', err);
        }
    };

    //페이지 경로에 따라 배경색이 달라짐
    useEffect(() => {
        const { pathname } = window.location;
        if (pathname.startsWith('/user') || pathname === '/network' || pathname === '/wanted/update' || pathname === '/') {
            document.body.classList.add('portfolio');
        } else {
            document.body.classList.remove('portfolio');
        }
        // cleanup 함수
        return () => {
            document.body.classList.remove('portfolio');
        };
    }, []);

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }

        setWantedTitle(wanted.wantedTitle);
        setWantedContent(wanted.wantedContent);
    }, [userState, navigate, wanted.wantedTitle, wanted.wantedContent]);

    return (
        <Container>
            <Row>
                <Col xs={12} className="text-left text-center">
                    <h3 className="mt-5" style={{ color: '#2a3741', fontWeight: '800' }}>
                        Check the <span style={{ backgroundColor: '#8FC382' }}>“wanted”</span> board and join the project.
                        <br />
                        Or you can recruit your own team members.
                    </h3>
                    <p className="mb-5" style={{ color: '#2a3741' }}>
                        팀원 모집을 확인하고 프로젝트에 참여해보세요.
                        <br />
                        원하는 프로젝트가 없을 경우 직접 팀원을 모집할 수 있어요.
                    </p>
                </Col>
            </Row>
            <Row>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.0rem', fontWeight: 'bold' }} className="ms-1">
                            제목
                        </Card.Title>
                        <Form.Control placeholder="제목을 입력해주세요" value={wantedTitle} onChange={onChangeTitle} />
                    </Card.Body>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.0rem', fontWeight: 'bold' }} className="ms-1">
                            본문
                        </Card.Title>
                        <Form.Control
                            placeholder="본문을 입력해주세요"
                            as="textarea"
                            rows={12}
                            value={wantedContent}
                            onChange={onChangeContent}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        className="me-3"
                        onClick={() => {
                            handleEdit();
                        }}
                        style={{ backgroundColor: '#2A3741', border: '0px', fontSize: '0.8em' }}>
                        게시글 편집
                    </Button>
                    <Button variant="danger" className="me-3" onClick={() => handleDelete()} style={{ fontSize: '0.8em' }}>
                        게시글 삭제
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/wanted/read', { state: { wanted: wanted } })}
                        style={{ fontSize: '0.8em' }}>
                        취소
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default WantedUpdate;
