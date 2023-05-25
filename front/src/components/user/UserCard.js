import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';

function UserCard({ user, setIsEditing, isEditable, isNetwork, userImageUrl }) {
    const navigate = useNavigate();

    if (userImageUrl === undefined) {
        userImageUrl = 'http://placekitten.com/200/200';
    }

    return (
        <Card className="mb-5 ms-5 mr-5" style={{ width: '18rem', borderRadius: '18px' }}>
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img
                        style={{ width: '10rem', height: '8rem' }}
                        className="mb-3 mt-1"
                        // src='http://placekitten.com/200/200'
                        src={userImageUrl}
                        alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
                    />
                </Row>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user?.name}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted" style={{ fontSize: '0.8rem' }}>
                    {user?.email}
                </Card.Subtitle>

                {(!user?.gitLink || user?.gitLink !== 'undefined') && (
                    <Card.Link href={`${user?.gitLink}`} className="mb-3 text-muted" style={{ fontSize: '0.8rem' }}>
                        {user?.gitLink}
                    </Card.Link>
                )}
                <Card.Text className="mb-2 mt-2 text-muted">{user?.description}</Card.Text>

                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <Button variant="outline-info" size="sm" onClick={() => setIsEditing(true)}>
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
            </Card.Body>
        </Card>
    );
}

export default UserCard;
