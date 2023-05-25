import is from '@sindresorhus/is';
import { Router } from 'express';
import { wantedService } from '../services/wantedService';

const wantedRouter = Router();

// 전체 모집 정보 조회
wantedRouter.get('/', async (req, res, next) => {
    try {
        const wanted = await wantedService.findAll();
        res.status(200).json(wanted);
    } catch (error) {
        next(error);
    }
});

// 특정 모집 정보 조회
wantedRouter.get('/:wantedId', async (req, res, next) => {
    try {
        const { wantedId } = req.params;
        const wanted = await wantedService.findWanted({ wantedId });

        if (!wanted) {
            res.status(400).send({ error: '이 게시글은 존재하지 않습니다.' });
            throw new Error('이 게시글은 존재하지 않습니다.');
        }

        res.status(200).json(wanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 추가
wantedRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { wantedTitle, wantedContent } = req.body;
        const newWanted = { wantedTitle, wantedContent };

        if (!wantedTitle || !wantedContent) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const createdWanted = await wantedService.createWanted({ userId, newWanted });
        res.status(201).json(createdWanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 수정
wantedRouter.put('/:wantedId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { wantedId } = req.params;
        const { wantedTitle, wantedContent } = req.body;

        const wanted = await wantedService.findWanted({ wantedId });
        if (!wanted) {
            res.status(400).send({ error: '이 게시글은 존재하지 않습니다.' });
            throw new Error('이 게시글은 존재하지 않습니다.');
        }

        if (!wantedTitle || !wantedContent) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newWanted = { wantedTitle, wantedContent };
        const updatedWanted = await wantedService.updateWanted({ userId, wantedId, newWanted });
        res.status(200).json(updatedWanted);
    } catch (error) {
        next(error);
    }
});

// 모집 정보 삭제
wantedRouter.delete('/:wantedId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { wantedId } = req.params;

        const wanted = await wantedService.findWanted({ wantedId });
        if (!wanted) {
            res.status(400).send({ error: '이 게시글은 존재하지 않습니다.' });
            throw new Error('이 게시글은 존재하지 않습니다.');
        }

        const deletedWanted = await wantedService.deleteWanted({ userId, wantedId });

        res.status(200).json(deletedWanted);
    } catch (error) {
        next(error);
    }
});

export { wantedRouter };
