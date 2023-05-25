import React from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

function ProjectForm({ formSendFunction, currentData, isFlag, item }) {
    const {
        handleSubmit,
        handleCancel,
        handleDelete,
        onChangeName,
        onChangeStartDate,
        onChangeEndDate,
        onChangeDescription,
        onChangeGitLink,
    } = formSendFunction;
    const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink, currentEditId } = currentData;
    const { isDateValid } = isFlag;

    return (
        <div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="프로젝트 명*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="프로젝트 명"
                        value={projectName}
                        onChange={onChangeName}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="프로젝트 시작일자*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="date"
                        placeholder="프로젝트 시작일자"
                        value={projectStartDate}
                        onChange={onChangeStartDate}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="프로젝트 종료일자*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="date"
                        placeholder="프로젝트 종료일자"
                        value={projectEndDate}
                        onChange={onChangeEndDate}
                    />
                </FloatingLabel>
                {projectStartDate && projectEndDate && !isDateValid && (
                    <Form.Text className="date-success">프로젝트 시작일자보다 프로젝트 종료일자가 이전입니다.</Form.Text>
                )}
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="프로젝트 설명*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="프로젝트 설명"
                        value={projectDescription}
                        onChange={onChangeDescription}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="프로젝트 GitLink" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="프로젝트 GitLink"
                        value={projectGitLink}
                        onChange={onChangeGitLink}
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

export default ProjectForm;
