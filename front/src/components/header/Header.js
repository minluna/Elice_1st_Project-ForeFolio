import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserStateContext, DispatchContext } from '../../App';
import { Typography } from '@material-ui/core';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
    const isLogin = !!userState.user;

    // 로그아웃 클릭 시 실행되는 함수
    const logout = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem('userToken');
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: 'LOGOUT' });
        // 기본 페이지로 돌아감.
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand href="/">
                    <Typography variant="h5" style={{ fontFamily: 'BMKIRANGHAERANG' }}>
                        Forefolio.com
                    </Typography>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
                    <Nav.Link onClick={() => navigate('/network')}>네트워크</Nav.Link>
                    <Nav.Link onClick={() => navigate('/wanted')}>팀원 구하기</Nav.Link>
                    {isLogin && <Nav.Link onClick={logout}>로그아웃</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
