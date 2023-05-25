import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: '설명이 아직 없습니다. 추가해 주세요.',
        },
        gitLink: {
            type: String,
            required: false,
        },
        userImage: {
            contentType: String,
            imageUri: String,
            filename: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = model('User', UserSchema);

export { UserModel };
