import UserModel, { UserCreationAttributes } from "@/factory/models/user.model";
import utils from "@/utils";

class AuthService {
    createInstance(data: UserCreationAttributes): Promise<UserModel> {
        return UserModel.create(data)
    }
    findByEmail(email: string): Promise<UserModel | null> {
        return UserModel.findOne({ where: { email } })
    }
    findById(id: number): Promise<UserModel | null> {
        return UserModel.findByPk(id)
    }
    findByToken(token: string): Promise<UserModel | null> {
        return UserModel.findOne({ where: { email_verification_token: token } })
    }
    async update(id: number, data: any): Promise<[affectedCount: number]> {
        return UserModel.update(data, { where: { id } });
    }
    async createUser(data: UserCreationAttributes): Promise<UserModel> {
        const user = await UserModel.create(data);
        await user.save();
        return user;
    }
    async delete(id: number): Promise<number> {
        return UserModel.destroy({ where: { id } })
    }
}
export default new AuthService();