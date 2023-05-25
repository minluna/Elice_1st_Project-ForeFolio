import React from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

function StackForm({ formSendFunction, currentData, item }) {
    const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDescription } = formSendFunction;
    const { stackName, stackDescription, currentEditId } = currentData;

    return (
        <div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="기술 이름*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="기술 이름"
                        value={stackName}
                        onChange={onChangeName}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="기술 설명*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="기술 설명"
                        value={stackDescription}
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
    );
}

export default StackForm;
