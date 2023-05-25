import { User, Comment } from '../db';

class commentService {
    // 전체 댓글 조회
    static async findAll({ wantedId }) {
        const comment = await Comment.findAll({ wantedId });
        return comment;
    }

    // 특정 댓글 조회
    static async findComment({ commentId }) {
        const comment = await Comment.findById({ commentId });
        return comment;
    }

    // 댓글 추가
    static async createComment({ userId, wantedId, newComment }) {
        const { commentSaveContent } = newComment;
        const createdComment = await Comment.create({ userId, wantedId, commentSaveContent });
        return createdComment;
    }

    // 댓글 수정
    static async updateComment({ userId, commentId, newComment }) {
        const { commentContent } = newComment;
        const updatedComment = await Comment.update({ userId, commentId, commentContent });
        return updatedComment;
    }

    // 댓글 삭제
    static async deleteComment({ userId, commentId }) {
        const user = await User.findById({ userId });
        const deletedComment = await Comment.delete({ userId, commentId });
        return deletedComment;
    }
}

export { commentService };
