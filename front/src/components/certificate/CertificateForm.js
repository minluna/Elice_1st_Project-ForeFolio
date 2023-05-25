import React from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

function CertificateForm({ formSendFunction, currentData, item }) {
    const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDate } = formSendFunction;
    const { certName, certAcDate, currentEditId } = currentData;

    return (
        <div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="자격증 명*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="자격증 명"
                        value={certName}
                        onChange={onChangeName}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="취득일자*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="date"
                        placeholder="취득일자"
                        value={certAcDate}
                        onChange={onChangeDate}
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
    );
}

export default CertificateForm;
