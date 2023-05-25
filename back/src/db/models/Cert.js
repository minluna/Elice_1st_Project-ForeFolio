import { CertModel } from '../schemas/cert';
import { UserModel } from '../schemas/user';

class Cert {
    // 유저의 모든 자격증 정보 조회
    static async findAll({ userId }) {
        const certs = await CertModel.find({ userId: userId });
        return certs;
    }

    // 유저의 특정 자격증 정보 조회
    static async findById({ certId }) {
        const cert = await CertModel.findById({ _id: certId });
        return cert;
    }

    // 자격증 정보 추가
    static async create({ userId, certName, certAcDate }) {
        const createCert = await CertModel.create({ certName, certAcDate, userId: userId });
        return createCert;
    }

    // 자격증 정보 수정
    static async update({ userId, certId, certName, certAcDate }) {
        const updatedCert = await CertModel.updateOne({ userId: userId, _id: certId }, { certName, certAcDate });
        return updatedCert;
    }

    // 자격증 정보 삭제
    static async delete({ userId, certId }) {
        const deletedCert = await CertModel.deleteOne({ _id: certId, userId: userId });
        return deletedCert;
    }
}

export { Cert };
