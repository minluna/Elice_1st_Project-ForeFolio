import { ProjectModel } from '../schemas/project';
import { UserModel } from '../schemas/user';
import fs from 'fs';

class Project {
    // 유저의 모든 프로젝트 정보 조회
    static async findAll({ userId }) {
        const projects = await ProjectModel.find({ userId: userId });
        return projects;
    }

    // 유저의 특정 프로젝트 정보 조회
    static async findById({ projectId }) {
        const project = await ProjectModel.findById({ _id: projectId });
        return project;
    }

    // 프로젝트 정보 추가
    static async create({ userId, projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink }) {
        const createProject = await ProjectModel.create({
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
            userId: userId,
        });

        return createProject;
    }

    // 프로젝트 정보 수정
    static async update({
        userId,
        projectId,
        projectName,
        projectStartDate,
        projectEndDate,
        projectDescription,
        projectGitLink,
    }) {
        const updatedProject = await ProjectModel.updateOne(
            { userId: userId, _id: projectId },
            {
                projectName,
                projectStartDate,
                projectEndDate,
                projectDescription,
                projectGitLink,
            },
        );

        return updatedProject;
    }

    // 프로젝트 정보 삭제
    static async delete({ userId, projectId }) {
        const deletedProject = await ProjectModel.deleteOne({ _id: projectId, userId: userId });
        return deletedProject;
    }
}

export { Project };
