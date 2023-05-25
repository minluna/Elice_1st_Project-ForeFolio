import { UserModel } from '../schemas/user';
import { CommentModel } from '../schemas/comment';
import { Util } from '../../utils/util';
import { WantedModel } from '../schemas/wanted';
class Comment {
    // 게시물에 달린 모든 댓글 조회
    static async findAll({ wantedId }) {
        const comment = await CommentModel.find({ wantedId: wantedId });
        return comment;
    }

    // 특정 댓글 조회
    static async findById({ commentId }) {
        const comment = await CommentModel.findById({ _id: commentId });
        return comment;
    }

    // 댓글 추가
    static async create({ userId, wantedId, commentSaveContent }) {
        const user = await UserModel.findOne({ _id: userId });
        const commentContent = commentSaveContent;
        const createdComment = await CommentModel.create({
            wantedId,
            commentContent,
            userId: user._id,
            userName: user.name,
            userImageUri: user.userImage.imageUri ? user.userImage.imageUri : null,
        });

        return createdComment;
    }

    // 댓글 수정
    static async update({ userId, commentId, commentContent }) {
        const user = await UserModel.findOne({ _id: userId });
        const updatedComment = await CommentModel.updateOne({ userId: user._id, _id: commentId }, { commentContent });
        return updatedComment;
    }

    // 댓글 삭제
    static async delete({ userId, commentId }) {
        const user = await UserModel.findOne({ _id: userId });
        const deletedComment = await CommentModel.deleteOne({ _id: commentId, userId: user._id });
        return deletedComment;
    }

    // 전체댓글 삭제(본문 자체가 삭제 될 때 실행시키는 용도)
    static async deleteAll({ wantedId }) {
        const deletedComments = await CommentModel.deleteMany({ wantedId });
        return deletedComments;
    }

    static async updateUser({ userId, fieldToUpdate, newValue }) {
        const user = await UserModel.findOne({ _id: userId });

        let update = {};

        if (fieldToUpdate === 'name') {
            update = { userName: newValue };
            const option = { returnOriginal: false };

            await CommentModel.updateMany({ userId: user._id }, update, option);
        }

        if (fieldToUpdate === 'userImage') {
            update = {
                userImageUri: newValue.imageUri,
            };
            const option = { returnOriginal: false };

            await CommentModel.updateMany({ userId: user._id }, update, option);
        }
    }
}

export { Comment };
