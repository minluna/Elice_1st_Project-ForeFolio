import { Schema, model } from 'mongoose';

const EducationSchema = new Schema(
    {
        eduSchool: {
            type: String,
            required: true,
        },
        eduMajor: {
            type: String,
            required: true,
        },
        eduEnterDate: {
            type: String,
            required: true,
        },
        eduGraduateDate: {
            type: String,
            required: false,
        },
        eduDegree: {
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

const EducationModel = model('Education', EducationSchema);

export { EducationModel, EducationSchema };
