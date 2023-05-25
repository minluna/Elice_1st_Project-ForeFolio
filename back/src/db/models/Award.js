import { AwardModel } from '../schemas/award';
import { UserModel } from '../schemas/user';

class Award {
    // 유저의 모든 수상 정보 조회
    static async findAll({ userId }) {
        const user = await UserModel.findOne({ _id: userId });
        const awards = await AwardModel.find({ userId: user._id });

        return awards;
    }

    // 유저의 특정 수상 정보 조회
    static async findById({ awardId }) {
        const award = await AwardModel.findById({ _id: awardId });

        return award;
    }

    // 수상 정보 추가
    static async create({ userId, awardName, awardDate, awardInstitution, awardDescription }) {
        const user = await UserModel.findOne({ _id: userId });
        const createAward = await AwardModel.create({
            awardName,
            awardDate,
            awardInstitution,
            awardDescription,
            userId: user._id,
        });

        return createAward;
    }

    // 수상 정보 수정
    static async update({ userId, awardId, awardName, awardDate, awardInstitution, awardDescription }) {
        const user = await UserModel.findOne({ _id: userId });
        const updatedAward = await AwardModel.updateOne(
            { userId: user._id, _id: awardId },
            { awardName, awardDate, awardInstitution, awardDescription },
        );

        return updatedAward;
    }

    // 수상 정보 삭제
    static async delete({ userId, awardId }) {
        const user = await UserModel.findOne({ _id: userId });
        const deletedAward = await AwardModel.deleteOne({ _id: awardId, userId: user._id });

        return deletedAward;
    }
}

export { Award };
