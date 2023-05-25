import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Types } from 'mongoose';

class projectService {
    // 유저의 전체 프로젝트 정보 조회
    static async findAll({ userId }) {
        const projects = await Project.findAll({ userId });
        return projects;
    }

    // 특정 프로젝트 정보 조회
    static async findOne({ projectId }) {
        const project = await Project.findById({ projectId });
        return project;
    }

    // 특정 프로젝트 제외하고 모든 프로젝트 조회
    static async findExcept({ userId, projectId }) {
        const projects = await Project.findAll({ userId });
        const exceptProjects = projects.filter(project => Types.ObjectId(project._id).toString() !== projectId);
        return exceptProjects;
    }

    // 유저의 개별 프로젝트 정보 추가
    static async createProject({ userId, newProject }) {
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = newProject;

        const createdProject = await Project.create({
            userId,
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
        });

        return createdProject;
    }

    // 유저의 개별 프로젝트 정보 수정
    static async updateProject({ userId, projectId, newProject }) {
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = newProject;

        const updatedProject = await Project.update({
            userId,
            projectId,
            projectName,
            projectStartDate,
            projectEndDate,
            projectDescription,
            projectGitLink,
        });

        return updatedProject;
    }

    // 유저의 개별 프로젝트 정보 삭제
    static async deleteProject({ userId, projectId }) {
        const project = await Project.findById({ projectId });
        const deletedProject = await Project.delete({ userId, projectId });

        return deletedProject;
    }
}

export { projectService };
