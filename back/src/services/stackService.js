import { Stack } from '../db';
import { Types } from 'mongoose';

class stackService {
    // 전체 스택 정보 조회
    static async findAll({ userId }) {
        const stacks = await Stack.findAll({ userId });

        return stacks;
    }
    // 개별 스택 정보 조회
    static async findOne({ stackId }) {
        const stack = await Stack.findById({ stackId });
        return stack;
    }
    // 특정 스택 제외하고 모든 스택 조회
    static async findExcept({ userId, stackId }) {
        const stacks = await Stack.findAll({ userId });
        const exceptStacks = stacks.filter(stack => Types.ObjectId(stack._id).toString() !== stackId);
        return exceptStacks;
    }
    // 스택 정보 추가
    static async createStack({ userId, newStack }) {
        // 스택 정보 추가 권한 제한은 프론트를 통해 막아둠

        const { stackName, stackDescription } = newStack;
        const createdStack = await Stack.create({ userId, stackName, stackDescription });

        return createdStack;
    }

    // 스택 정보 수정
    static async updateStack({ userId, stackId, newStack }) {
        // 스택 정보 수정 권한 제한은 프론트를 통해 막아둠
        const { stackName, stackDescription } = newStack;
        const updatedStack = await Stack.update({ userId, stackId, stackName, stackDescription });
        return updatedStack;
    }

    // 스택 정보 삭제
    static async deleteStack({ userId, stackId }) {
        // 스택 정보 삭제 권한 제한은 프론트를 통해 막아둠

        const deletedStack = await Stack.delete({ userId, stackId });

        return deletedStack;
    }
}

export { stackService };
