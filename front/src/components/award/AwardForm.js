import React from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

function AwardForm({ formSendFunction, currentData, item }) {
    const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDate, onChangeInstitution, onChangeDescription } =
        formSendFunction;
    const { awardName, awardDate, awardInstitution, awardDescription, currentEditId } = currentData;

    return (
        <div>
            <div>
                <div className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="수상 명*" className="mb-3">
                        <Form.Control
                            style={{ width: '100%' }}
                            type="text"
                            placeholder="수상명"
                            value={awardName}
                            onChange={onChangeName}
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="수상 일자*" className="mb-3">
                        <Form.Control
                            style={{ width: '100%' }}
                            type="date"
                            placeholder="수상일자"
                            value={awardDate}
                            onChange={onChangeDate}
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="수상기관*" className="mb-3">
                        <Form.Control
                            style={{ width: '100%' }}
                            type="text"
                            placeholder="수상기관"
                            value={awardInstitution}
                            onChange={onChangeInstitution}
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="수여내용*" className="mb-3">
                        <Form.Control
                            style={{ width: '100%' }}
                            type="text"
                            placeholder="수여내용"
                            value={awardDescription}
                            onChange={onChangeDescription}
                        />
                    </FloatingLabel>
                </div>
                <div className="mb-3 text-center">
                    {currentEditId !== item._id ? (
                        <React.Fragment>
                            <Button
                                style={{ backgroundColor: '#3077e1', border: 'none' }}
                                className="me-2"
                                onClick={() => handleSubmit(item._id)}>
                                확인
                            </Button>
                            <Button
                                style={{ backgroundColor: '#7469bc', border: 'none' }}
                                variant="secondary"
                                onClick={() => handleCancel()}>
                                취소
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button
                                style={{ backgroundColor: '#3077e1', border: 'none' }}
                                className="me-2"
                                onClick={() => handleSubmit(item._id)}>
                                확인
                            </Button>

                            <Button
                                style={{ backgroundColor: '#7469bc', border: 'none' }}
                                className="me-2"
                                variant="secondary"
                                onClick={() => handleCancel()}>
                                취소
                            </Button>
                            <Button style={{ backgroundColor: '#fb4f4f', border: 'none' }} onClick={() => handleDelete(item._id)}>
                                삭제
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AwardForm;
