import { set } from 'mongoose';
import { User, Education } from '../db';
import { v4 as uuidv4 } from 'uuid';

// eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree
class educationService {
    // 아이디를 통한 특정 유저의 전체 학력 조회
    static async findAll({ userId }) {
        const educations = await Education.findAll({ userId });
        return educations;
    }

    // 특정 학력 조회
    static async findOne({ educationId }) {
        const education = await Education.findById({ educationId });
        return education;
    }

    // 특정 유저의 학력 추가
    static async createEducation({ userId, newEducation }) {
        const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = newEducation;
        const createdEducation = await Education.create({
            userId,
            eduSchool,
            eduMajor,
            eduEnterDate,
            eduGraduateDate,
            eduDegree,
        });

        return createdEducation;
    }

    // 특정 유저의 학력 수정
    static async updateEducation({ userId, educationId, newEducation }) {
        const { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree } = newEducation;
        const updatedEducation = await Education.update({
            userId,
            educationId,
            eduSchool,
            eduMajor,
            eduEnterDate,
            eduGraduateDate,
            eduDegree,
        });
        return updatedEducation;
    }

    // 특정 유저의 학력 삭제
    static async deletedEducation({ userId, educationId }) {
        const deletedEducation = await Education.delete({ userId, educationId });

        return deletedEducation;
    }
}
export { educationService };
