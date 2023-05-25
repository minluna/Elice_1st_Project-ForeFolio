import { Button, Row, Col } from 'react-bootstrap';

// EducationItem -> 컴포넌트 명을 보고 어떤 컴포넌트인지 파악하기 쉽게
function EducationP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <Row style={{ height: '80px' }}>
            <Col xs={10}>
                {item.eduSchool}
                <td className="col-4">
                    {item.eduEnterDate} - {item.eduGraduateDate ? item.eduGraduateDate : '없음'}
                </td>
                <td className="col-4">
                    {item.eduMajor} ({item.eduDegree})
                </td>
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

export default EducationP;
