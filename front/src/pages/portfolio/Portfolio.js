import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, ListGroup } from 'react-bootstrap';
import { UserStateContext } from '../../App';
import * as Api from '../../api';

import User from '../../components/user/User';
import Award from '../../components/award/Award';
import Education from '../../components/education/Education';
import Certificate from '../../components/certificate/Certificate';
import Project from '../../components/project/Project';
import Stack from '../../components/stack/Stack';

function Portfolio() {
    const navigate = useNavigate();
    const params = useParams();
    // useState 훅을 통해 portfolioOwner 상태를 생성함.
    const [portfolioOwner, setPortfolioOwner] = useState(null);
    // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    const userState = useContext(UserStateContext);

    const fetchPorfolioOwner = async ownerId => {
        try {
            // 유저 id를 가지고 "/user/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
            const res = await Api.get('user', ownerId);
            // 사용자 정보는 response의 data임.
            const ownerData = res.data;
            // portfolioOwner을 해당 사용자 정보로 세팅함.
            setPortfolioOwner(ownerData);
            // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
            setIsFetchCompleted(true);
        } catch (err) {
            if (err.response.status === 400) {
                alert('유저 정보를 불러오는데 실패하였습니다.');
            }
            console.log('유저 정보를 불러오는데 실패하였습니다.', err);
        }
    };

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
        // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
        if (!userState.user) {
            navigate('/login', { replace: true });
            return;
        }

        if (params.userId && params.userId !== 'undefined') {
            // 만약 현재 URL이 "/user/:userId" 라면, 이 userId를 유저 id로 설정함.
            const ownerId = params.userId;
            // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
            fetchPorfolioOwner(ownerId);
        } else {
            // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
            const ownerId = userState.user._id ?? userState.user.id;
            // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
            fetchPorfolioOwner(ownerId);
        }
    }, [params, userState, navigate]);

    if (!isFetchCompleted) {
        return 'loading...';
    }

    return (
        <Container className="mt-5">
            <ListGroup variant="flush" style={{ borderRadius: '0.5rem' }}>
                <ListGroup.Item>
                    <Col xs className="mb-2">
                        <User
                            portfolioOwnerId={portfolioOwner.userInfo._id}
                            isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                        />
                    </Col>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Education
                        portfolioOwnerId={portfolioOwner.userInfo._id}
                        isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Stack
                        portfolioOwnerId={portfolioOwner.userInfo._id}
                        isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Award
                        portfolioOwnerId={portfolioOwner.userInfo._id}
                        isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                    />
                </ListGroup.Item>

                <ListGroup.Item>
                    <Certificate
                        portfolioOwnerId={portfolioOwner.userInfo._id}
                        isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    <Project
                        portfolioOwnerId={portfolioOwner.userInfo._id}
                        isEditable={portfolioOwner.userInfo._id === (userState.user?._id ?? userState.user?.id)}
                    />
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
}

export default Portfolio;
