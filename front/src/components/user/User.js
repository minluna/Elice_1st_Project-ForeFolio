import React, { useState, useEffect, useCallback } from 'react';
import UserEditFormPortfolio from './UserEditFormPortfolio';
import UserCardPortfolio from './UserCardPortfolio';
import * as Api from '../../api';

function User({ portfolioOwnerId, isEditable }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [user, setUser] = useState(null);
    // useState 훅을 통해 userImageUrl 상태를 생성함.
    const [userImageUrl, setUserImageUrl] = useState('');

    const fetchData = useCallback(async () => {
        try {
            // "user/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
            const res = await Api.get('user', portfolioOwnerId);
            setUser(res.data.userInfo);
            setUserImageUrl(res.data.imagePath);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('User 정보 불러오기를 실패하였습니다.', err);
        }
    }, [portfolioOwnerId]);

    useEffect(() => {
        fetchData();
    }, [fetchData, isEditing]);

    return (
        <>
            {isEditing ? (
                <UserEditFormPortfolio user={user} setIsEditing={setIsEditing} setUser={setUser} />
            ) : (
                <UserCardPortfolio user={user} setIsEditing={setIsEditing} isEditable={isEditable} userImageUrl={userImageUrl} />
            )}
        </>
    );
}

export default User;
