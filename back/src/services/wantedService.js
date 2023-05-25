import { User, Wanted, Comment } from '../db';

class wantedService {
    //전체 모집 정보를 얻음
    static async findAll() {
        const wanted = await Wanted.findAll();
        return wanted;
    }

    //특정 모집 정보를 얻음
    static async findWanted({ wantedId }) {
        const wanted = await Wanted.findById({ wantedId });
        return wanted;
    }

    //모집 정보 추가
    static async createWanted({ userId, newWanted }) {
        const { wantedTitle, wantedContent } = newWanted;
        const createdWanted = await Wanted.create({ userId, wantedTitle, wantedContent });
        return createdWanted;
    }

    //모집 정보 수정
    static async updateWanted({ userId, wantedId, newWanted }) {
        const { wantedTitle, wantedContent } = newWanted;
        const updatedWanted = await Wanted.update({ userId, wantedId, wantedTitle, wantedContent });
        return updatedWanted;
    }

    //모집 정보 삭제
    static async deleteWanted({ userId, wantedId }) {
        const deletedWanted = await Wanted.delete({ userId, wantedId });
        //모집 원문이 삭제되면 해당 글의 댓글도 모두 삭제됨
        const deletedComment = await Comment.deleteAll({ wantedId });
        return deletedWanted;
    }
}

export { wantedService };
