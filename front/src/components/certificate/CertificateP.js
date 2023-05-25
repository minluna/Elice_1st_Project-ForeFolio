import { Button, Row, Col } from 'react-bootstrap';

function CertificateP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <Row style={{ height: '80px' }}>
            <Col xs={10}>
                <Row>
                    <td>{item.certName}</td>
                </Row>
                <Row>
                    <td>{item.certAcDate}</td>
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

export default CertificateP;
