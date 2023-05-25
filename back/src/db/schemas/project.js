import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        projectStartDate: {
            type: String,
            required: true,
        },
        projectEndDate: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        projectGitLink: {
            type: String,
            required: false,
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

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel, ProjectSchema };
