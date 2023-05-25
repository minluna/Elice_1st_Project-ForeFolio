import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

import * as Api from '../../api';

import ProjectForm from './ProjectForm';
import ProjectP from './ProjectP';

function ProjectDetail({ portfolioOwnerId, isEditable }) {
    const [dbItem, setDbItem] = useState([]);
    const [isToggle, setIsToggle] = useState(false); // 추가 버튼 클릭 유무
    const [isEdit, setIsEdit] = useState(false); // 편집 버튼 클릭 유무
    const [currentEditId, setcurrentEditId] = useState(''); // Edit 버튼을 클릭 시 버튼 표시를 구분하기 위한 값

    const [projectName, setProjectName] = useState(''); // 프로젝트 이름
    const [projectStartDate, setProjectStartDate] = useState(''); // 프로젝트 시작일자
    const [projectEndDate, setProjectEndDate] = useState(''); // 프로젝트 종료일자
    const [projectDescription, setProjectDescription] = useState(''); // 프로젝트 설명
    const [projectGitLink, setProjectGitLink] = useState(''); // 프로젝트 GitLink 주소

    const isDateValid = projectStartDate < projectEndDate;

    const onChangeName = e => {
        setProjectName(e.target.value);
    };

    const onChangeStartDate = e => {
        setProjectStartDate(e.target.value);
    };

    const onChangeEndDate = e => {
        setProjectEndDate(e.target.value);
    };

    const onChangeDescription = e => {
        setProjectDescription(e.target.value);
    };

    const onChangeGitLink = e => {
        setProjectGitLink(e.target.value);
    };

    const AddInput = () => {
        setIsToggle(true);

        setProjectName('');
        setProjectStartDate('');
        setProjectEndDate('');
        setProjectDescription('');
        setProjectGitLink('');
    };

    const fetchProject = async ownerId => {
        try {
            // "/project" 엔드포인트로 요청해 사용자 정보를 불러옴.(userId는 req.currentUserId 사용)
            const res = await Api.get(`project/${ownerId.userId}`);
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
                // "/project" 엔드포인트로 post요청함.(userId는 req.currentUserId 사용)
                await Api.post(`project/`, {
                    projectName,
                    projectStartDate,
                    projectEndDate,
                    projectDescription,
                    projectGitLink,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchProject({ userId });

                setProjectName('');
                setProjectStartDate('');
                setProjectEndDate('');
                setProjectDescription('');
                setProjectGitLink('');
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('프로젝트 추가에 실패하였습니다.', err);
            }
        } else {
            try {
                // "project/projectId" 엔드포인트로 put요청함.
                await Api.put(`project/${item._id}`, {
                    projectName,
                    projectStartDate,
                    projectEndDate,
                    projectDescription,
                    projectGitLink,
                });

                setIsToggle(false);
                setIsEdit(false);

                fetchProject({ userId });
            } catch (err) {
                if (err.response.status === 400) {
                    alert(err.response.data.error);
                }
                console.log('프로젝트 수정에 실패하였습니다.', err);
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
        setProjectName(item.projectName);
        setProjectStartDate(item.projectStartDate);
        setProjectEndDate(item.projectEndDate);
        setProjectDescription(item.projectDescription);
        setProjectGitLink(item.projectGitLink);

        setcurrentEditId(item._id);
        setIsEdit(true);
    };

    const handleCancel = () => {
        fetchProject({ userId });

        setIsToggle(false);
        setIsEdit(false);
    };

    const handleDelete = async id => {
        try {
            // "project/projectId" 엔드포인트로 delete 요청함.
            await Api.delete(`project/${id}`);

            fetchProject({ userId });

            setIsToggle(false);
            setIsEdit(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('프로젝트 삭제에 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        fetchProject({ userId });
    }, [userId]);

    const formSendFunction = {
        handleSubmit,
        handleCancel,
        handleDelete,
        onChangeName,
        onChangeStartDate,
        onChangeEndDate,
        onChangeDescription,
        onChangeGitLink,
    };
    const formSendcurrentData = {
        projectName,
        projectStartDate,
        projectEndDate,
        projectDescription,
        projectGitLink,
        currentEditId,
    };
    const formSendisFlag = { isDateValid };
    const pSendFunction = { handleEdit };
    const pSendisFlag = { isEditable, isToggle, isEdit };

    return (
        <div>
            {dbItem.map(item => (
                <div key={item._id}>
                    {item.isSave === true && item.isEdit === false ? (
                        <ProjectP pSendFunction={pSendFunction} isFlag={pSendisFlag} item={item} />
                    ) : (
                        <ProjectForm
                            formSendFunction={formSendFunction}
                            currentData={formSendcurrentData}
                            isFlag={formSendisFlag}
                            item={item}
                        />
                    )}
                </div>
            ))}
            {isToggle === true ? (
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

export default ProjectDetail;
