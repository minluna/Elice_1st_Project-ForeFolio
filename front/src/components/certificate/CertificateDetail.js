import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

import * as Api from '../../api';

import CertificateForm from './CertificateForm';
import CertificateP from './CertificateP';

function CertificateDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false); // 추가 버튼 클릭 유무
    const [isEdit, setIsEdit] = useState(false); // 편집 버튼 클릭 유무
    const [currentEditId, setcurrentEditId] = useState(''); // Edit 버튼을 클릭 시 버튼 표시를 구분하기 위한 값

    const [certName, setCertName] = useState(''); // 자격증 명
    const [certAcDate, setCertAcDate] = useState(''); // 취득일자

    const onChangeName = e => {
        setCertName(e.target.value);
    };

    const onChangeDate = e => {
        setCertAcDate(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setCertName('');
        setCertAcDate('');
    };

    const fetchCert = async ownerId => {
        try {
            // "/cert" 엔드포인트로 요청해 사용자 정보를 불러옴.
            const res = await Api.get(`cert/${ownerId.userId}`);
            // 사용자 정보는 response의 data임.
            const ownerData = res.data;
            // portfolioOwner을 해당 사용자 정보로 세팅함.
            setDbItem(ownerData);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('사용자 데이터 불러오기에 실패하였습니다.', err);
        }
    };

    const userId = portfolioOwnerId;

    const handleSubmit = async id => {
        const item = dbItem.filter(item => item._id === id)[0];

        if (item === undefined || item.isSave === false) {
            try {
                // "/cert" 엔드포인트로 post요청함.(userId는 req.currentUserId 사용)
                await Api.post(`cert/`, {
                    certName,
                    certAcDate,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchCert({ userId });

                setCertName('');
                setCertAcDate('');
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('자격증 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                // "cert/certId" 엔드포인트로 put요청함.
                await Api.put(`cert/${item._id}`, {
                    certName,
                    certAcDate,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchCert({ userId });
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('자격증 수정에 실패하였습니다.', err);
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
        setCertName(item.certName);
        setCertAcDate(item.certAcDate);

        setcurrentEditId(item._id);
        setIsEdit(true);
    };

    const handleCancel = () => {
        fetchCert({ userId });

        setIsToggle(false);
        setIsEdit(false);
    };

    const handleDelete = async id => {
        try {
            // "cert/certId" 엔드포인트로 delete 요청함.
            await Api.delete(`cert/${id}`);

            fetchCert({ userId });

            setIsToggle(false);
            setIsEdit(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('자격증 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchCert({ userId });
    }, [userId]);

    const formSendFunction = { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDate };
    const formSendcurrentData = { certName, certAcDate, currentEditId };
    const pSendFunction = { handleEdit };
    const pSendisFlag = { isEditable, isToggle, isEdit };

    return (
        <div>
            {dbItem.map(item => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <CertificateP pSendFunction={pSendFunction} isFlag={pSendisFlag} item={item} />
                    ) : (
                        <CertificateForm formSendFunction={formSendFunction} currentData={formSendcurrentData} item={item} />
                    )}
                </div>
            ))}
            {isToggle === true ? (
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

export default CertificateDetail;
