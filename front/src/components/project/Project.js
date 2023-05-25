import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import ProjectDetail from './ProjectDetail';

function ProjectCreate({ portfolioOwnerId, isEditable }) {
    return (
        <Row>
            <Col xs={2}>
                <Card.Title className="ms-3 mt-3">프로젝트</Card.Title>
            </Col>
            <Col xs={9}>
                <Row>
                    <ProjectDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                </Row>
            </Col>
        </Row>
    );
}

export default ProjectCreate;
