import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';

function UserCardPortfolio({ user, setIsEditing, isEditable, isNetwork, userImageUrl }) {
    const navigate = useNavigate();

    if (userImageUrl === undefined) {
        userImageUrl = 'http://placekitten.com/200/200';
    }

    const handleClick = () => {
        if (user.gitLink.startsWith('http')) {
            window.location.href = `${user.gitLink}`;
        } else {
            window.location.href = `https://${user.gitLink}`;
        }
    };

    return (
        <Row xs="auto">
            <Col>
                <Card.Img
                    style={{ width: '10rem', height: '10rem', borderRadius: '70%', overflow: 'hidden' }}
                    className="mb-3 mt-3 ms-3"
                    src={userImageUrl}
                    alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
                />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
                <Row xs="auto" className="justify-content-left">
                    <Col>
                        <Card.Title>{user?.name}</Card.Title>
                    </Col>
                    <Col>
                        <Card.Subtitle className="mt-1 text-muted">{user?.email}</Card.Subtitle>
                    </Col>
                </Row>
                <Row>
                    <Card.Text className="mb-2 text-muted">{user?.description}</Card.Text>
                </Row>
            </Col>
            <Col sm className="mt-3 text-end text-info">
                {(!user?.gitLink || user?.gitLink !== 'undefined') && (
                    <Button style={{ backgroundColor: '#2a3741', border: 'none', width: '80px' }} onClick={handleClick}>
                        Link
                    </Button>
                )}
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-end text-info">
                            <Col>
                                <Button
                                    style={{ backgroundColor: '#2a3741', border: 'none', width: '80px' }}
                                    onClick={() => setIsEditing(true)}>
                                    편집
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}

                {isNetwork && (
                    <Row>
                        <Card.Link className="mt-3" href="#" onClick={() => navigate(`/user/${user._id}`)}>
                            포트폴리오
                        </Card.Link>
                    </Row>
                )}
            </Col>
        </Row>
    );
}

export default UserCardPortfolio;
