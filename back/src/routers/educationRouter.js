import { Router } from 'express';
import is from '@sindresorhus/is';
import { educationService } from '../services/educationService';
import { Util } from '../utils/util';

const eduRouter = Router();
// eduSchool eduMajor eduEnterDate eduGraduateDate eduDegree

// 전체 학력 정보 조회
eduRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;
    try {
        const educations = await educationService.findAll({ userId });
        if (!educations) {
            res.status(400).send({ error: '유저의 학력 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 학력 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(educations);
    } catch (error) {
        next(error);
    }
});

// 특정 유저 학력 정보 조회
eduRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const educations = await educationService.findAll({ userId });
        if (!educations) {
            res.status(400).send({ error: '유저의 학력 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 학력 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(educations);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 추가
eduRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Context-Type을 application/json으로 설정해주세요');
        }
        const userId = req.currentUserId;
        let { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = req.body;

        if (eduDegree === '재학' || eduDegree === '휴학') {
            if (!eduSchool || !eduMajor || !eduEnterDate || !eduDegree) {
                res.status(400).send({ error: '졸업일자를 제외한 모든 값을 입력했는지 확인해주세요.' });
                throw new Error('졸업일자를 제외한 모든 값을 입력했는지 확인해주세요.');
            }
            eduGraduateDate = '';
        } else {
            if (!eduSchool || !eduMajor || !eduEnterDate || !eduGraduateDate || !eduDegree) {
                res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
                throw new Error('모든 값을 입력했는지 확인해주세요.');
            }
        }

        if (!Util.dateRegexp(eduEnterDate)) {
            res.status(400).send({ error: '입학일자 값을 확인해주세요.' });
            throw new Error('입학일자 값을 확인해주세요.');
        }
        if (Util.isFutureDate(eduEnterDate)) {
            res.status(400).send({ error: '미래의 입학일자를 입력할 수 없습니다.' });
            throw new Error('미래의 입학일자를 입력할 수 없습니다.');
        }
        if (eduDegree !== '재학' && eduDegree !== '휴학') {
            if (!Util.dateRegexp(eduGraduateDate)) {
                res.status(400).send({ error: '졸업일자 값을 확인해주세요.' });
                throw new Error('졸업일자 값을 확인해주세요.');
            }
            if (Util.isFutureDate(eduGraduateDate)) {
                res.status(400).send({ error: '미래의 졸업일자를 입력할 수 없습니다.' });
                throw new Error('미래의 졸업일자를 입력할 수 없습니다.');
            }
        }

        // 미래의 졸업일자는 입력가능
        const isDateValid = !eduGraduateDate || eduEnterDate < eduGraduateDate;

        if (!isDateValid) {
            res.status(400).send({ error: '입학날짜보다 졸업일자가 이전입니다.' });
            throw new Error('입학날짜보다 졸업일자가 이전입니다.');
        }

        const newEducation = { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree };
        const createdEducation = await educationService.createEducation({ userId, newEducation });
        res.status(201).json(createdEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 수정
eduRouter.put('/:educationId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Context-Type을 application/json으로 설정해주세요');
        }
        const userId = req.currentUserId;
        const { educationId } = req.params;

        const education = await educationService.findOne({ educationId });
        if (!education) {
            res.status(400).send({ error: '이 학력 정보는 존재하지 않습니다.' });
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }

        let { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = req.body;

        if (eduDegree === '재학' || eduDegree === '휴학') {
            if (!eduSchool || !eduMajor || !eduEnterDate || !eduDegree) {
                res.status(400).send({ error: '졸업일자를 제외한 모든 값을 입력했는지 확인해주세요.' });
                throw new Error('졸업일자를 제외한 모든 값을 입력했는지 확인해주세요.');
            }
            eduGraduateDate = '';
        } else {
            if (!eduSchool || !eduMajor || !eduEnterDate || !eduGraduateDate || !eduDegree) {
                res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
                throw new Error('모든 값을 입력했는지 확인해주세요.');
            }
        }
        if (!Util.dateRegexp(eduEnterDate)) {
            res.status(400).send({ error: '입학일자 값을 확인해주세요.' });
            throw new Error('입학일자 값을 확인해주세요.');
        }
        if (Util.isFutureDate(eduEnterDate)) {
            res.status(400).send({ error: '미래의 입학일자를 입력할 수 없습니다.' });
            throw new Error('미래의 입학일자를 입력할 수 없습니다.');
        }
        if (eduDegree !== '재학' && eduDegree !== '휴학') {
            if (!Util.dateRegexp(eduGraduateDate)) {
                res.status(400).send({ error: '졸업일자 값을 확인해주세요.' });
                throw new Error('졸업일자 값을 확인해주세요.');
            }
            if (Util.isFutureDate(eduGraduateDate)) {
                res.status(400).send({ error: '미래의 졸업일자를 입력할 수 없습니다.' });
                throw new Error('미래의 졸업일자를 입력할 수 없습니다.');
            }
        }
        // 미래의 졸업일자는 입력가능
        const isDateValid = !eduGraduateDate || eduEnterDate < eduGraduateDate;

        if (!isDateValid) {
            res.status(400).send({ error: '입학날짜보다 졸업일자가 이전입니다.' });
            throw new Error('입학날짜보다 졸업일자가 이전입니다.');
        }

        const newEducation = { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree };
        const updatedEducation = await educationService.updateEducation({ userId, educationId, newEducation });
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
});

// 학력 정보 삭제
eduRouter.delete('/:educationId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { educationId } = req.params;
        const education = await educationService.findOne({ educationId });
        if (!education) {
            res.status(400).send({ error: '이 학력 정보는 존재하지 않습니다.' });
            throw new Error(`이 학력 정보는 존재하지 않습니다.`);
        }
        const deletedEducation = await educationService.deletedEducation({ userId, educationId });
        res.status(200).json(deletedEducation);
    } catch (error) {
        next(error);
    }
});

export { eduRouter };
