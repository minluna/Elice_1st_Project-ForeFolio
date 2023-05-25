import is from '@sindresorhus/is';
import { Router } from 'express';
import { commentService } from '../services/commentService';

const commentRouter = Router();

//해당 게시글의 모든 댓글 조회
commentRouter.get('/:wantedId', async (req, res, next) => {
    try {
        const { wantedId } = req.params;
        const comments = await commentService.findAll({ wantedId });
        res.status(201).json(comments);
    } catch (error) {
        next(error);
    }
});

// 댓글 추가
commentRouter.post('/:wantedId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        const userId = req.currentUserId;
        const { wantedId } = req.params;
        const { commentSaveContent } = req.body;
        const newComment = { commentSaveContent };

        if (!commentSaveContent) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdComment = await commentService.createComment({ userId, wantedId, newComment });
        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 수정
commentRouter.put('/:commentId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { commentId } = req.params;
        const { commentContent } = req.body;
        const newComment = { commentContent };

        const comment = await commentService.findComment({ commentId });
        if (!comment) {
            res.status(400).send({ error: '이 댓글은 존재하지 않습니다.' });
            throw new Error(`이 댓글은 존재하지 않습니다.`);
        }

        if (!commentContent) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }
        const updatedComment = await commentService.updateComment({ userId, commentId, newComment });

        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
});

// 댓글 삭제
commentRouter.delete('/:commentId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { commentId } = req.params;

        const comment = await commentService.findComment({ commentId });
        if (!comment) {
            res.status(400).send({ error: '이 댓글은 존재하지 않습니다.' });
            throw new Error(`이 댓글은 존재하지 않습니다.`);
        }

        const deletedComment = await commentService.deleteComment({ userId, commentId });

        res.status(200).json(deletedComment);
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
