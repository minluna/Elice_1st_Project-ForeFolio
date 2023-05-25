import { Cert } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Types } from 'mongoose';

class certService {
    // 유저의 전체 자격증 정보 조회
    static async findAll({ userId }) {
        const certs = await Cert.findAll({ userId });
        return certs;
    }
    // 특정 자격증 정보 조회
    static async findOne({ certId }) {
        const cert = await Cert.findById({ certId });
        return cert;
    }

    // 특정 프로젝트 제외하고 모든 프로젝트 조회
    static async findExcept({ userId, certId }) {
        const certs = await Cert.findAll({ userId });
        const exceptCerts = certs.filter(cert => Types.ObjectId(cert._id).toString() !== certId);
        return exceptCerts;
    }

    // 유저의 개별 자격증 정보 추가
    static async createCert({ userId, newCert }) {
        const { certName, certAcDate } = newCert;
        const createdCert = await Cert.create({ userId, certName, certAcDate });

        return createdCert;
    }

    // 유저의 개별 자격증 정보 수정
    static async updateCert({ userId, certId, newCert }) {
        const { certName, certAcDate } = newCert;
        const updatedCert = await Cert.update({ userId, certId, certName, certAcDate });
        return updatedCert;
    }

    // 유저의 개별 자격증 정보 삭제
    static async deleteCert({ userId, certId }) {
        const deletedCert = await Cert.delete({ userId, certId });
        return deletedCert;
    }
}

export { certService };
