import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AwardDetail from './AwardDetail';

function Award({ portfolioOwnerId, isEditable }) {
    return (
        <Row>
            <Col xs={2}>
                <Card.Title className="ms-3 mt-3">수상 이력</Card.Title>
            </Col>
            <Col xs={9}>
                <Row>
                    <AwardDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                </Row>
            </Col>
        </Row>
    );
}

export default Award;
