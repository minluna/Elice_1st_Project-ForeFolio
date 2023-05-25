import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

import * as Api from '../../api';

import StackForm from './StackForm';
import StackP from './StackP';

function StackDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentEditId, setcurrentEditId] = useState('');

    const [stackName, setStackName] = useState('');
    const [stackDescription, setStackDescription] = useState('');

    const onChangeName = e => {
        setStackName(e.target.value);
    };

    const onChangeDescription = e => {
        setStackDescription(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setStackName('');
        setStackDescription('');
    };

    const fetchStack = async ownerId => {
        try {
            const res = await Api.get(`stack/${ownerId.userId}`);
            const ownerData = res.data;
            setDbItem(ownerData);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('데이터 불러오기에 실패하였습니다.', err);
        }
    };

    const userId = portfolioOwnerId;

    const handleSubmit = async id => {
        const item = dbItem.filter(item => item._id === id)[0];

        if (item === undefined || item.isSave === false) {
            try {
                await Api.post(`stack/`, {
                    stackName,
                    stackDescription,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchStack({ userId });

                setStackName('');
                setStackDescription('');
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('보유 기술 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                await Api.put(`stack/${item._id}`, {
                    stackName,
                    stackDescription,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchStack({ userId });
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('보유 기술 수정에 실패하였습니다.', err);
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
        setStackName(item.stackName);
        setStackDescription(item.stackDescription);

        setcurrentEditId(item._id);
        setIsEdit(true);
    };

    const handleCancel = () => {
        fetchStack({ userId });

        setIsToggle(false);
        setIsEdit(false);
    };

    const handleDelete = async id => {
        try {
            await Api.delete(`stack/${id}`);

            fetchStack({ userId });

            setIsToggle(false);
            setIsEdit(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('보유 기술 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchStack({ userId });
    }, [userId]);

    const formSendFunction = { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDescription };
    const formSendcurrentData = { stackName, stackDescription, currentEditId };
    const pSendFunction = { handleEdit };
    const pSendisFlag = { isEditable, isToggle, isEdit };

    return (
        <div>
            {dbItem.map(item => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <StackP pSendFunction={pSendFunction} isFlag={pSendisFlag} item={item} />
                    ) : (
                        <StackForm formSendFunction={formSendFunction} currentData={formSendcurrentData} item={item} />
                    )}
                </div>
            ))}
            {isToggle === true ? (
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

export default StackDetail;
