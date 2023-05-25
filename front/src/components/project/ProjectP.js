import { Button, Row, Col } from 'react-bootstrap';

function ProjectP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <Row style={{ height: '120px' }}>
            <Col xs={10}>
                {item.projectName}
                <td className="col-4">
                    {item.projectStartDate} - {item.projectEndDate}
                </td>
                {item.projectDescription} <br />
                <a href={`https://${item.projectGitLink}`}>{item.projectGitLink}</a>
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

export default ProjectP;
