import { WantedModel } from '../schemas/wanted';
import { UserModel } from '../schemas/user';

class Wanted {
    // 모든 모집 정보 조회
    static async findAll() {
        const wanted = await WantedModel.find({});
        return wanted;
    }

    // 특정 모집 정보 조회
    static async findById({ wantedId }) {
        const wanted = await WantedModel.findById({ _id: wantedId });
        return wanted;
    }

    // 모집 정보 추가
    static async create({ userId, wantedTitle, wantedContent }) {
        const user = await UserModel.findOne({ _id: userId });
        const createWanted = await WantedModel.create({ wantedTitle, wantedContent, userId: user._id });
        return createWanted;
    }

    // 모집 정보 수정
    static async update({ userId, wantedId, wantedTitle, wantedContent }) {
        const user = await UserModel.findOne({ _id: userId });
        const updatedWanted = await WantedModel.updateOne({ userId: user._id, _id: wantedId }, { wantedTitle, wantedContent });
        return updatedWanted;
    }

    // 모집 정보 삭제
    static async delete({ userId, wantedId }) {
        const user = await UserModel.findOne({ _id: userId });
        const deletedWanted = await WantedModel.deleteOne({ _id: wantedId, userId: user._id });

        return deletedWanted;
    }
}

export { Wanted };
