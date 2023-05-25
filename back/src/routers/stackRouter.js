import is from '@sindresorhus/is';
import { Router } from 'express';
import { stackService } from '../services/stackService';

const stackRouter = Router();

// 전체 스택 조회
stackRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const stacks = await stackService.findAll({ userId });
        if (!stacks) {
            res.status(400).send({ error: '유저의 스택 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 스택 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(stacks);
    } catch (error) {
        next(error);
    }
});

// 특정 유저 스택 조회
stackRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const stacks = await stackService.findAll({ userId });
        if (!stacks) {
            res.status(400).send({ error: '유저의 스택 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 스택 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(stacks);
    } catch (error) {
        next(error);
    }
});

// 스택 정보 추가
stackRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;

        const { stackName, stackDescription } = req.body;

        if (!stackName || !stackDescription) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const newStack = { stackName, stackDescription };

        const stacks = await stackService.findAll({ userId });
        const stackExists = stacks.some(stack => stack.stackName.toLowerCase() === newStack.stackName.toLowerCase());
        if (stackExists) {
            res.status(400).send({ error: `${newStack.stackName} 스택은 이미 존재합니다.` });
            throw new Error(`${newStack.stackName} 스택은 이미 존재합니다.`);
        }

        const createdStack = await stackService.createStack({ userId, newStack });
        res.status(201).json(createdStack);
    } catch (error) {
        next(error);
    }
});

// 스택 정보 수정
stackRouter.put('/:stackId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { stackId } = req.params;
        const { stackName, stackDescription } = req.body;

        if (!stackName || !stackDescription) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        const stack = await stackService.findOne({ stackId });
        if (!stack) {
            res.status(400).send({ error: '이 스택 정보는 존재하지 않습니다.' });
            throw new Error('이 스택 정보는 존재하지 않습니다.');
        }

        const newStack = { stackName, stackDescription };
        // 수정하려는 스택만 제외하고 다른 모든 스택을 가져올 수 있는 방법
        const exceptStacks = await stackService.findExcept({ userId, stackId });
        const stackExists = exceptStacks.some(stack => stack.stackName.toLowerCase() === newStack.stackName.toLowerCase());
        if (stackExists) {
            res.status(400).send({ error: `${newStack.stackName} 스택은 이미 존재합니다.` });
            throw new Error(`${newStack.stackName} 스택은 이미 존재합니다.`);
        }
        const updatedStack = await stackService.updateStack({ userId, stackId, newStack });
        res.status(200).json(updatedStack);
    } catch (error) {
        next(error);
    }
});

// 스택 정보 삭제
stackRouter.delete('/:stackId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { stackId } = req.params;

        const stack = await stackService.findOne({ stackId });
        if (!stack) {
            res.status(400).send({ error: '이 스택 정보는 존재하지 않습니다.' });
            throw new Error('이 스택 정보는 존재하지 않습니다.');
        }

        const deletedStack = await stackService.deleteStack({ userId, stackId });
        res.status(200).json(deletedStack);
    } catch (error) {
        next(error);
    }
});

export { stackRouter };
