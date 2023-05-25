import React from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

function EducationForm({ formSendFunction, currentData, isFlag, item }) {
    const {
        handleSubmit,
        handleCancel,
        handleDelete,
        onChangeSchool,
        onChangeMajor,
        onChangeEnterDate,
        onChangeGraduateDate,
        offChangeGraduateDate,
        onChangeDegree,
    } = formSendFunction;
    const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree, currentEditId } = currentData;
    const { isDateValid } = isFlag;

    return (
        <div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="학교이름*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="학교이름"
                        value={eduSchool}
                        onChange={onChangeSchool}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="전공*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="전공"
                        value={eduMajor}
                        onChange={onChangeMajor}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="입학일자*" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="date"
                        placeholder="입학일자"
                        value={eduEnterDate}
                        onChange={onChangeEnterDate}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="졸업일자" className="mb-3">
                    <Form.Control
                        style={{ width: '100%' }}
                        type="date"
                        placeholder="졸업일자"
                        value={eduDegree === '재학' || eduDegree === '휴학' ? '' : eduGraduateDate}
                        onChange={eduDegree === '재학' || eduDegree === '휴학' ? offChangeGraduateDate : onChangeGraduateDate}
                        disabled={eduDegree === '재학' || eduDegree === '휴학' ? true : false}
                    />
                </FloatingLabel>
                {eduEnterDate && eduGraduateDate && !isDateValid && eduDegree !== '재학' && eduDegree !== '휴학' && (
                    <Form.Text className="date-success">입학날짜보다 졸업일자가 이전입니다.</Form.Text>
                )}
            </div>
            <div className="mb-2">
                <Form.Check
                    inline
                    label="재학"
                    name="group1"
                    type="radio"
                    value="재학"
                    checked={eduDegree === '재학'}
                    onChange={onChangeDegree}
                />
                <Form.Check
                    inline
                    label="휴학"
                    name="group1"
                    type="radio"
                    value="휴학"
                    checked={eduDegree === '휴학'}
                    onChange={onChangeDegree}
                />
                <Form.Check
                    inline
                    label="학사졸업"
                    name="group1"
                    type="radio"
                    value="학사졸업"
                    checked={eduDegree === '학사졸업'}
                    onChange={onChangeDegree}
                />
                <Form.Check
                    inline
                    label="석사졸업"
                    name="group1"
                    type="radio"
                    value="석사졸업"
                    checked={eduDegree === '석사졸업'}
                    onChange={onChangeDegree}
                />
                <Form.Check
                    inline
                    label="박사졸업"
                    name="group1"
                    type="radio"
                    value="박사졸업"
                    checked={eduDegree === '박사졸업'}
                    onChange={onChangeDegree}
                />
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

export default EducationForm;
