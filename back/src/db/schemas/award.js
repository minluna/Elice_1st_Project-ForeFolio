import { Schema, model } from 'mongoose';

const AwardSchema = new Schema(
    {
        awardName: {
            type: String,
            required: true,
        },
        awardDate: {
            type: String,
            required: true,
        },
        awardInstitution: {
            type: String,
            required: true,
        },
        awardDescription: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isSave: {
            type: Boolean,
            default: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const AwardModel = model('Award', AwardSchema);

export { AwardModel, AwardSchema };
