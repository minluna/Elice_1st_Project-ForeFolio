import is from '@sindresorhus/is';
import { Router } from 'express';
import { certService } from '../services/certService';
import { Util } from '../utils/util';

const certRouter = Router();

// 전체 자격증 정보 조회
certRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const certs = await certService.findAll({ userId });
        if (!certs) {
            res.status(400).send({ error: '유저의 자격증 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 자격증 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(certs);
    } catch (error) {
        next(error);
    }
});

//특정 유저 자격증 조회
certRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const certs = await certService.findAll({ userId });
        if (!certs) {
            res.status(400).send({ error: '유저의 자격증 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 자격증 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(certs);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 추가
certRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { certName, certAcDate } = req.body;

        if (!certName || !certAcDate) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!Util.dateRegexp(certAcDate)) {
            res.status(400).send({ error: '취득일자 값을 확인해주세요' });
            throw new Error('취득일자 값을 확인해주세요');
        }

        if (Util.isFutureDate(certAcDate)) {
            res.status(400).send({ error: '미래의 취득일자는 입력할 수 없습니다.' });
            throw new Error('미래의 취득일자는 입력할 수 없습니다.');
        }

        const newCert = { certName, certAcDate };
        const certs = await certService.findAll({ userId });
        const certExists = certs.some(cert => cert.certName === newCert.certName);
        if (certExists) {
            res.status(400).send({ error: `${newCert.certName} 자격증은 이미 존재합니다.` });
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const createdCert = await certService.createCert({ userId, newCert });
        res.status(201).json(createdCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 수정
certRouter.put('/:certId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { certId } = req.params;
        const { certName, certAcDate } = req.body;

        if (!certName || !certAcDate) {
            res.status(400).send({ error: '모든 값을 입력했는지 확인해주세요.' });
            throw new Error('모든 값을 입력했는지 확인해주세요.');
        }

        if (!Util.dateRegexp(certAcDate)) {
            res.status(400).send({ error: '취득일자 값을 확인해주세요' });
            throw new Error('취득일자 값을 확인해주세요');
        }

        if (Util.isFutureDate(certAcDate)) {
            res.status(400).send({ error: '미래의 취득일자는 입력할 수 없습니다.' });
            throw new Error('미래의 취득일자는 입력할 수 없습니다.');
        }

        const cert = await certService.findOne({ certId });
        if (!cert) {
            res.status(400).send({ error: '이 자격증 정보는 존재하지 않습니다.' });
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }

        const newCert = { certName, certAcDate };
        const exceptCerts = await certService.findExcept({ userId, certId });
        const certExists = exceptCerts.some(cert => cert.certName === newCert.certName);
        if (certExists) {
            res.status(400).send({ error: `${newCert.certName} 자격증은 이미 존재합니다.` });
            throw new Error(`${newCert.certName} 자격증은 이미 존재합니다.`);
        }

        const updatedCert = await certService.updateCert({ userId, certId, newCert });
        res.status(200).json(updatedCert);
    } catch (error) {
        next(error);
    }
});

// 자격증 정보 삭제
certRouter.delete('/:certId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { certId } = req.params;

        const cert = await certService.findOne({ certId });
        if (!cert) {
            res.status(400).send({ error: '이 자격증 정보는 존재하지 않습니다.' });
            throw new Error('이 자격증 정보는 존재하지 않습니다.');
        }
        const deletedCert = await certService.deleteCert({ userId, certId });

        res.status(200).json(deletedCert);
    } catch (error) {
        next(error);
    }
});

export { certRouter };
