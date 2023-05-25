import { Schema, model } from 'mongoose';

const StackSchema = new Schema(
    {
        stackName: {
            type: String,
            required: true,
        },
        stackDescription: {
            type: String,
            required: true,
        },
        isSave: {
            type: Boolean,
            default: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const StackModel = model('Stack', StackSchema);

export { StackModel, StackSchema };
