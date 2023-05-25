import { StackModel } from '../schemas/stack';
import { UserModel } from '../schemas/user';

class Stack {
    // 유저의 모든 스텍 정보 조회
    static async findAll({ userId }) {
        const stacks = await StackModel.find({ userId: userId });
        return stacks;
    }

    static async findById({ stackId }) {
        const stack = await StackModel.findById({ _id: stackId });
        return stack;
    }

    // 스택 정보 추가
    static async create({ userId, stackName, stackDescription }) {
        const createStack = await StackModel.create({ stackName, stackDescription, userId: userId });

        return createStack;
    }

    // 스택 정보 수정
    static async update({ userId, stackId, stackName, stackDescription }) {
        const updatedStack = await StackModel.updateOne({ userId: userId, _id: stackId }, { stackName, stackDescription });
        return updatedStack;
    }

    // 스택 정보 삭제
    static async delete({ userId, stackId }) {
        const deletedStack = await StackModel.deleteOne({ _id: stackId, userId: userId });

        return deletedStack;
    }
}

export { Stack };
