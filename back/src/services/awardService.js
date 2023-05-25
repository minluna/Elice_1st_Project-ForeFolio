import { User, Award } from '../db';

class awardService {
    //유저의 전체 수상내역 조회
    static async findAll({ userId }) {
        const awards = await Award.findAll({ userId });
        return awards;
    }

    // 특정 수상내역 조회
    static async findOne({ awardId }) {
        const award = await Award.findById({ awardId });
        return award;
    }

    // 개별 수상내역 추가
    static async createAward({ userId, newAward }) {
        const { awardName, awardDate, awardInstitution, awardDescription } = newAward;
        const createdAward = await Award.create({ userId, awardName, awardDate, awardInstitution, awardDescription });
        return createdAward;
    }

    // 개별 수상내역 수정
    static async updateAward({ userId, awardId, newAward }) {
        const { awardName, awardDate, awardInstitution, awardDescription } = newAward;
        const updatedAward = await Award.update({ userId, awardId, awardName, awardDate, awardInstitution, awardDescription });
        return updatedAward;
    }

    // 개별 수상내역 삭제
    static async deleteAward({ userId, awardId }) {
        const deleteAward = await Award.delete({ userId, awardId });
        return deleteAward;
    }
}

export { awardService };
