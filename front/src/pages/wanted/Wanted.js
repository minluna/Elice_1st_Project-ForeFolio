import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, ListGroup, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

const CommentCount = ({ wantedId }) => {
    const [count, setCount] = useState(0);
    const fetchWantedCommentLength = useCallback(async () => {
        const res = await Api.get(`comment/${wantedId}`);
        const commentLength = res.data.length;
        setCount(commentLength);
    }, [wantedId]);

    useEffect(() => {
        fetchWantedCommentLength();
    }, [fetchWantedCommentLength]);
    return <>{count}</>;
};

const Max_Content_Length = 50; // 리스트에 표시할 최대 글자수

function Wanted() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [wantedList, setWantedList] = useState([]);

    // 게시글의 프리뷰를 보여주는 함수
    function getPreview(content) {
        if (content.length > Max_Content_Length) {
            return content.substring(0, Max_Content_Length) + '...'; // Max_Content_Length 길이만큼만 자르고 "..." 문자열 추가
        }
        return content; // Max_Content_Length보다 짧은 경우 그대로 반환
    }

    //페이지 경로에 따라 배경색이 달라짐
    useEffect(() => {
        const { pathname } = window.location;
        if (pathname.startsWith('/user') || pathname === '/network' || pathname === '/wanted' || pathname === '/') {
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
        try {
            // "wantedlist" 엔드포인트로 GET 요청을 하고, wantedList response의 data로 세팅함.
            Api.get('wanted').then(res => setWantedList(res.data));
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('wantedList를 불러오는데 실패했습니다.', err);
        }
    }, [userState, navigate]);

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
                <Col className="position-relative mt-4">
                    <Button
                        className="m-3 position-absolute bottom-0 end-0 "
                        variant="primary"
                        onClick={() => navigate('/wanted/create')}
                        style={{ backgroundColor: '#2A3741', border: '0px', fontSize: '0.8em' }}>
                        게시글 작성하기
                    </Button>
                </Col>
            </Row>
            <Row>
                <ListGroup className="my-4">
                    {wantedList.map(item => (
                        <ListGroup.Item
                            action
                            key={item._id}
                            as="li"
                            className="d-flex justify-content-between align-items-start mb-3 p-3"
                            onClick={() => navigate('/wanted/read', { state: { wanted: item } })}
                            style={{ borderRadius: '11px', border: '1px solid #B8B8B8', cursor: 'pointer' }}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold mb-2" style={{ fontSize: '1em' }}>
                                    {item.wantedTitle}
                                </div>
                                <div style={{ fontSize: '0.8em', color: 'grey' }}>{getPreview(item.wantedContent)}</div>
                            </div>
                            <Badge pill bg="#" style={{ fontSize: '0.75em', color: 'grey' }}>
                                View More ↘︎
                            </Badge>
                            <Badge pill bg="secondary">
                                <CommentCount wantedId={item._id} />
                            </Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
        </Container>
    );
}

export default Wanted;
