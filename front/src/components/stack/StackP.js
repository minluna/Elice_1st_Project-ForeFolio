import { Button, Card, Row, Col } from 'react-bootstrap';

function StackP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <Card style={{ backgroundColor: '#ffffff' }} className="text-left mb-3">
            <Row className="ms-3 mt-3 mb-3">
                <Col xs={10}>
                    {item.stackName} <br />
                    {item.stackDescription}
                </Col>
                <Col xs={2} className="text-center">
                    {isEditable && (
                        <Button
                            style={{ color: '#2a3741' }}
                            variant="link"
                            onClick={() => handleEdit(item._id)}
                            disabled={isToggle || isEdit ? true : false}>
                            편집
                        </Button>
                    )}
                </Col>
            </Row>
        </Card>
    );
}

export default StackP;
