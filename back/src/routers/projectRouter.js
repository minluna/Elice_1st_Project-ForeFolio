import is from '@sindresorhus/is';
import { Router } from 'express';
import { projectService } from '../services/projectService';
import { Util } from '../utils/util';

const projectRouter = Router();

// 전체 프로젝트 정보 조회
projectRouter.get('/', async (req, res, next) => {
    const userId = req.currentUserId;

    try {
        const projects = await projectService.findAll({ userId });
        if (!projects) {
            res.status(400).send({ error: '유저의 프로젝트 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 프로젝트 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

// 특정 유저 프로젝트 정보 조회
projectRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const projects = await projectService.findAll({ userId });
        if (!projects) {
            res.status(400).send({ error: '유저의 프로젝트 정보가 존재하지 않습니다.' });
            throw new Error(`${userId} 유저의 프로젝트 정보가 존재하지 않습니다.`);
        }
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 추가
projectRouter.post('/', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = req.body;

        if (!projectName || !projectStartDate || !projectEndDate || !projectDescription) {
            res.status(400).send({ error: 'GitLink를 제외한 모든 값을 입력했는지 확인해주세요.' });
            throw new Error('GitLink를 제외한 모든 값을 입력했는지 확인해주세요.');
        }

        if (!Util.dateRegexp(projectStartDate) || !Util.dateRegexp(projectEndDate)) {
            res.status(400).send({ error: '프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요' });
            throw new Error('프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요.');
        }
        if (Util.isFutureDate(projectStartDate)) {
            res.status(400).send({ error: '미래의 프로젝트 시작일자는 입력할 수 없습니다.' });
            throw new Error('미래의 프로젝트 시작일자는 입력할 수 없습니다.');
        }
        if (Util.isFutureDate(projectEndDate)) {
            res.status(400).send({ error: '미래의 프로젝트 종료일자는 입력할 수 없습니다.' });
            throw new Error('미래의 프로젝트 종료일자는 입력할 수 없습니다.');
        }

        const isDateValid = projectStartDate < projectEndDate;

        if (!isDateValid) {
            res.status(400).send({ error: '프로젝트 시작일자보다 프로젝트 종료일자가 이전입니다.' });
            throw new Error('프로젝트 시작일자보다 프로젝트 종료일자가 이전입니다.');
        }

        const newProject = { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink };
        const projects = await projectService.findAll({ userId });
        const projectExists = projects.some(project => project.projectName === newProject.projectName);
        if (projectExists) {
            res.status(400).send({ error: `${newProject.projectName} 프로젝트는 이미 존재합니다.` });
            throw new Error(`${newProject.projectName} 프로젝트는 이미 존재합니다.`);
        }

        const createdProject = await projectService.createProject({ userId, newProject });
        res.status(201).json(createdProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 수정
projectRouter.put('/:projectId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }

        const userId = req.currentUserId;
        const { projectId } = req.params;
        const { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink } = req.body;

        if (!projectName || !projectStartDate || !projectEndDate || !projectDescription) {
            res.status(400).send({ error: 'GitLink를 제외한 모든 값을 입력했는지 확인해주세요.' });
            throw new Error('GitLink를 제외한 모든 값을 입력했는지 확인해주세요.');
        }

        if (!Util.dateRegexp(projectStartDate) || !Util.dateRegexp(projectEndDate)) {
            res.status(400).send({ error: '프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요' });
            throw new Error('프로젝트 시작일자 또는 프로젝트 종료일자 값을 확인해주세요');
        }
        if (Util.isFutureDate(projectStartDate)) {
            res.status(400).send({ error: '미래의 프로젝트 시작일자는 입력할 수 없습니다.' });
            throw new Error('미래의 프로젝트 시작일자는 입력할 수 없습니다.');
        }
        if (Util.isFutureDate(projectEndDate)) {
            res.status(400).send({ error: '미래의 프로젝트 종료일자는 입력할 수 없습니다.' });
            throw new Error('미래의 프로젝트 종료일자는 입력할 수 없습니다.');
        }

        const project = await projectService.findOne({ projectId });
        if (!project) {
            res.status(400).send({ error: '이 프로젝트 정보는 존재하지 않습니다.' });
            throw new Error('이 프로젝트 정보는 존재하지 않습니다.');
        }

        const isDateValid = projectStartDate < projectEndDate;

        if (!isDateValid) {
            res.status(400).send({ error: '프로젝트 시작일자보다 프로젝트 종료일자가 이전입니다.' });
            throw new Error('프로젝트 시작일자보다 프로젝트 종료일자가 이전입니다.');
        }

        const newProject = { projectName, projectStartDate, projectEndDate, projectDescription, projectGitLink };
        // 수정하려는 프로젝트만 제외하고 다른 모든 프로젝트를 가져오기
        const exceptProjects = await projectService.findExcept({ userId, projectId });
        const projectExists = exceptProjects.some(project => project.projectName === newProject.projectName);
        if (projectExists) {
            res.status(400).send({ error: `${newProject.projectName} 프로젝트는 이미 존재합니다.` });
            throw new Error(`${newProject.projectName} 프로젝트는 이미 존재합니다.`);
        }

        const updatedProject = await projectService.updateProject({ userId, projectId, newProject });
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 정보 삭제
projectRouter.delete('/:projectId', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { projectId } = req.params;

        const project = await projectService.findOne({ projectId });
        if (!project) {
            res.status(400).send({ error: '이 프로잭트 정보는 존재하지 않습니다.' });
            throw new Error('이 프로잭트 정보는 존재하지 않습니다.');
        }

        const deletedProject = await projectService.deleteProject({ userId, projectId });
        res.status(200).json(deletedProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
