import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import StackDetail from './StackDetail';

function Stack({ portfolioOwnerId, isEditable }) {
    return (
        <Row>
            <Col xs={2}>
                <Card.Title className="ms-3 mt-3">보유 기술</Card.Title>
            </Col>
            <Col xs={9}>
                <Row>
                    <StackDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                </Row>
            </Col>
        </Row>
    );
}

export default Stack;
