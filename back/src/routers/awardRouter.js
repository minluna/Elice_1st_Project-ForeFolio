import is from '@sindresorhus/is';
import { Router } from 'express';
import { awardService } from '../services/awardService';
import { Util } from '../utils/util';

const awardRouter = Router();

//전체 수상내역 조회
awardRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const awards = await awardService.findAll({ userId });
        if (!awards) {
            res.status(400).send({ error: '유저의 수상내역 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 수상내역 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(awards);
    } catch (error) {
        next(error);
    }
});

//특정 유저 수상내역 조회
awardRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const awards = await awardService.findAll({ userId });
        if (!awards) {
            res.status(400).send({ error: '유저의 수상내역 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 수상내역 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(awards);
    } catch (error) {
        next(error);
    }
});

//수상내역 추가
awardRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { awardName, awardDate, awardInstitution, awardDescription } = req.body;
        const newAward = { awardName, awardDate, awardInstitution, awardDescription };

        if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error({ message: '모든 값을 입력했는지 확인해주세요.' });
        }

        if (!Util.dateRegexp(awardDate)) {
            res.status(400).send({ error: '취득일자 값을 확인해주세요.' });
            throw new Error('취득일자 값을 확인해주세요');
        }

        if (Util.isFutureDate(awardDate)) {
            res.status(400).send({ error: '미래의 수상일자는 입력할 수 없습니다.' });
            throw new Error('미래의 수상일자는 입력할 수 없습니다.');
        }

        const createdAward = await awardService.createAward({ userId, newAward });

        res.status(201).send(createdAward);
    } catch (error) {
        next(error);
    }
});

//수상내역 수정
awardRouter.put('/:awardId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { awardId } = req.params;
        const { awardName, awardDate, awardInstitution, awardDescription } = req.body;

        const newAward = { awardName, awardDate, awardInstitution, awardDescription };

        const award = await awardService.findOne({ awardId });
        if (!award) {
            res.status(400).send({ error: '이 수상내역 정보는 존재하지 않습니다.' });
            throw new Error(`이 수상내역 정보는 존재하지 않습니다.`);
        }

        if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error({ message: '모든 값을 입력했는지 확인해주세요.' });
        }

        if (!Util.dateRegexp(awardDate)) {
            res.status(400).send({ error: '취득일자 값을 확인해주세요.' });
            throw new Error('취득일자 값을 확인해주세요');
        }

        if (Util.isFutureDate(awardDate)) {
            res.status(400).send({ error: '미래의 수상일자는 입력할 수 없습니다.' });
            throw new Error('미래의 수상일자는 입력할 수 없습니다.');
        }

        const updatedAward = await awardService.updateAward({ userId, awardId, newAward });
        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
});

//수상내역 삭제
awardRouter.delete('/:awardId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { awardId } = req.params;

        const award = await awardService.findOne({ awardId });
        if (!award) {
            res.status(400).send({ error: '이 수상내역 정보는 존재하지 않습니다.' });
            throw new Error(`이 수상내역 정보는 존재하지 않습니다.`);
        }
        const deletedAward = await awardService.deleteAward({ userId, awardId });

        res.status(200).json(deletedAward);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
