import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CertificateDetail from './CertificateDetail';

function CertificateCreate({ portfolioOwnerId, isEditable }) {
    return (
        <Row>
            <Col xs={2}>
                <Card.Title className="ms-3 mt-3">자격증</Card.Title>
            </Col>
            <Col xs={9}>
                <Row>
                    <CertificateDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                </Row>
            </Col>
        </Row>
    );
}

export default CertificateCreate;
