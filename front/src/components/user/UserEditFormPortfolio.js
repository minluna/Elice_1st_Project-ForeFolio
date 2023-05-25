import React, { useState } from 'react';
import { Button, Form, Col, FloatingLabel } from 'react-bootstrap';
import * as Api from '../../api';

function UserEditForm({ user, setIsEditing, setUser }) {
    //useState로 name 상태를 생성함.
    const [name, setName] = useState(user.name);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState(user.email);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(user.description);
    //useState로 gitLink 상태를 생성함.
    const [gitLink, setGitLink] = useState(user.gitLink === 'undefined' ? '' : user.gitLink);
    //useState로 userImage 상태를 생성함.
    const [userImage, setUserImage] = useState(user.userImage);

    const validateForm = () => {
        if (userImage && userImage.size > 1024 * 1024) {
            alert('이미지 크기는 1MB 이하여야 합니다.');
            return false;
        }
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            if (!validateForm()) {
                return;
            }
            const formData = new FormData();
            formData.append('userImage', userImage);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('gitLink', gitLink);

            // "user/유저id" 엔드포인트로 PUT 요청함.
            const res = await Api.putFile(`user/${user._id}`, formData);
            // 유저 정보는 response의 data임.
            const updatedUser = res.data;
            // 해당 유저 정보로 user을 세팅함.
            setUser(updatedUser);

            // isEditing을 false로 세팅함.
            setIsEditing(false);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('유저 수정에 실패하였습니다.', err);
        }
    };

    return (
        <div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="이름*" className="mb-3">
                    <Form.Control type="text" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="이메일*" className="mb-3">
                    <Form.Control type="email" placeholder="이메일" value={email} disabled />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="정보, 인사말" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="정보, 인사말"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        maxLength={15}
                    />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <FloatingLabel controlId="floatingInput" label="Git 주소" className="mb-3">
                    <Form.Control type="text" placeholder="Git 주소" value={gitLink} onChange={e => setGitLink(e.target.value)} />
                </FloatingLabel>
            </div>
            <div className="mb-2">
                <Form.Control type="file" onChange={e => setUserImage(e.target.files[0])} />
            </div>
            <div className="mb-2 text-center">
                <Col sm={{ span: 20 }}>
                    <Button
                        style={{ backgroundColor: '#3077e1', border: 'none' }}
                        variant="primary"
                        type="submit"
                        className="me-3"
                        onClick={e => handleSubmit(e)}>
                        확인
                    </Button>
                    <Button
                        style={{ backgroundColor: '#7469bc', border: 'none' }}
                        variant="secondary"
                        onClick={() => setIsEditing(false)}>
                        취소
                    </Button>
                </Col>
            </div>
        </div>
    );
}

export default UserEditForm;
