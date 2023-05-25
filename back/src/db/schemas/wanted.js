import { Schema, model } from 'mongoose';

const WantedSchema = new Schema(
    {
        wantedTitle: {
            type: String,
            required: true,
        },
        wantedContent: {
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

const WantedModel = model('Wanted', WantedSchema);

export { WantedModel, WantedSchema };
