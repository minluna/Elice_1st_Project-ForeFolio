import { Button, Row, Col } from 'react-bootstrap';

function AwardP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <Row style={{ height: '100px' }}>
            <Col xs={10}>
                <Row>
                    <td>
                        {item.awardName} ({item.awardDescription})
                    </td>
                </Row>
                <Row>
                    <td>{item.awardInstitution}</td>
                    <td>{item.awardDate}</td>
                </Row>
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
    );
}

export default AwardP;
