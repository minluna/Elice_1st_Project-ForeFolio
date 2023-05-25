import { UserModel } from '../schemas/user';
import { EducationModel } from '../schemas/education';
// crud
// eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree

class Education {
    // 특정 유저의 전체 학력 조회
    static async findAll({ userId }) {
        const educations = await EducationModel.find({ userId: userId });
        return educations;
    }
    // 특정 유저의 특정 학력 조회
    static async findById({ educationId }) {
        const education = await EducationModel.findById({ _id: educationId });
        return education;
    }

    // 특정 유저의 학력 추가
    static async create({ userId, eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree }) {
        const createdEducation = await EducationModel.create({
            eduSchool,
            eduMajor,
            eduEnterDate,
            eduGraduateDate,
            eduDegree,
            userId: userId,
        });
        return createdEducation;
    }

    // 특정 유저의 학력 수정
    static async update({ userId, educationId, eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree }) {
        const updatedEducation = await EducationModel.updateOne(
            { userId: userId, _id: educationId },
            { eduSchool, eduMajor, eduEnterDate, eduGraduateDate, eduDegree },
        );
        return updatedEducation;
    }

    // 특정 유저의 학력 삭제
    static async delete({ userId, educationId }) {
        const deletedEducation = await EducationModel.deleteOne({ _id: educationId, userId: userId });
        return deletedEducation;
    }
}

export { Education };
