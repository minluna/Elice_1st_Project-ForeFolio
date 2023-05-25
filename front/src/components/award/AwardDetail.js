import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

import * as Api from '../../api';

import AwardForm from './AwardForm';
import AwardP from './AwardP';

function AwardDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentEditId, setcurrentEditId] = useState('');

    const [awardName, setAwardName] = useState('');
    const [awardDate, setAwardDate] = useState('');
    const [awardInstitution, setAwardInstitution] = useState('');
    const [awardDescription, setAwardDescription] = useState('');

    const onChangeName = e => {
        setAwardName(e.target.value);
    };

    const onChangeDate = e => {
        setAwardDate(e.target.value);
    };

    const onChangeInstitution = e => {
        setAwardInstitution(e.target.value);
    };

    const onChangeDescription = e => {
        setAwardDescription(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setAwardName('');
        setAwardDate('');
        setAwardInstitution('');
        setAwardDescription('');
    };

    const fetchAward = async ownerId => {
        try {
            const res = await Api.get(`award/${ownerId.userId}`);
            const ownerData = res.data;
            setDbItem(ownerData);
        } catch (err) {
            if (err.respone.status === 400) {
                alert(err.response.data.error);
            }
            console.log('DB 불러오기를 실패하였습니다.', err);
        }
    };

    const userId = portfolioOwnerId;

    const handleSubmit = async id => {
        const item = dbItem.filter(item => item._id === id)[0];

        if (item === undefined || item.isSave === false) {
            try {
                await Api.post(`award/`, {
                    awardName,
                    awardDate,
                    awardInstitution,
                    awardDescription,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchAward({ userId });

                setAwardName('');
                setAwardDate('');
                setAwardInstitution('');
                setAwardDescription('');
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('수상이력 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                await Api.put(`award/${item._id}`, {
                    awardName,
                    awardDate,
                    awardInstitution,
                    awardDescription,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchAward({ userId });
            } catch (err) {
                console.log('수상이력 수정에 실패하였습니다.', err);
            }
        }
    };

    const handleEdit = id => {
        setDbItem(prevItems => {
            return prevItems.map(item => {
                if (item._id === id) {
                    return {
                        ...item,
                        isEdit: true,
                    };
                } else {
                    return item;
                }
            });
        });

        const item = dbItem.filter(item => item._id === id)[0];
        setAwardName(item.awardName);
        setAwardDate(item.awardDate);
        setAwardInstitution(item.awardInstitution);
        setAwardDescription(item.awardDescription);

        setcurrentEditId(item._id);
        setIsEdit(true);
    };

    const handleCancel = () => {
        fetchAward({ userId });

        setIsToggle(false);
        setIsEdit(false);
    };

    const handleDelete = async id => {
        try {
            await Api.delete(`award/${id}`);

            fetchAward({ userId });

            setIsToggle(false);
            setIsEdit(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('수상이력 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchAward({ userId });
    }, [userId]);

    const formSendFunction = {
        handleSubmit,
        handleCancel,
        handleDelete,
        onChangeName,
        onChangeDate,
        onChangeInstitution,
        onChangeDescription,
    };
    const formSendcurrentData = { awardName, awardDate, awardInstitution, awardDescription, currentEditId };
    const pSendFunction = { handleEdit };
    const pSendisFlag = { isEditable, isToggle, isEdit };

    return (
        <div>
            {dbItem.map(item => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <AwardP pSendFunction={pSendFunction} isFlag={pSendisFlag} item={item} />
                    ) : (
                        <AwardForm formSendFunction={formSendFunction} currentData={formSendcurrentData} item={item} />
                    )}
                </div>
            ))}
            {isToggle === true ? (
                <div>
                    <div className="mb-2">
                        <FloatingLabel controlId="floatingInput" label="수상 명*" className="mb-3">
                            <Form.Control
                                style={{ width: '100%' }}
                                type="text"
                                placeholder="수상명"
                                value={awardName}
                                onChange={onChangeName}
                            />{' '}
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
                        <React.Fragment>
                            <Button
                                style={{ backgroundColor: '#3077e1', border: 'none' }}
                                className="me-2"
                                onClick={() => handleSubmit()}>
                                확인
                            </Button>
                            <Button
                                style={{ backgroundColor: '#7469bc', border: 'none' }}
                                variant="secondary"
                                onClick={() => handleCancel()}>
                                취소
                            </Button>
                        </React.Fragment>
                    </div>
                </div>
            ) : (
                ''
            )}
            {isEditable && (
                <div className="mb-3 text-center">
                    {dbItem.length < 10 && (
                        <Button
                            style={{ backgroundColor: '#2a3741', border: 'none' }}
                            onClick={AddInput}
                            disabled={isToggle || isEdit ? true : false}>
                            +
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default AwardDetail;
