import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import EducationDetail from './EducationDetail';

function Education({ portfolioOwnerId, isEditable }) {
    return (
        <Row>
            <Col xs={2}>
                <Card.Title className="ms-3 mt-3">학력</Card.Title>
            </Col>
            <Col xs={9}>
                <Row>
                    <EducationDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                </Row>
            </Col>
        </Row>
    );
}

export default Education;
