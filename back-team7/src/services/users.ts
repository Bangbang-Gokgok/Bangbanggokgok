import { User } from '../models';
import { Types } from 'mongoose';

interface UserInfo {
  email: string;
  name: string;
}

interface UserData extends UserInfo {
  _id: Types.ObjectId;
}

class UserService {
  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { name } = userInfo;

    // 이름 중복 확인
    const user = await User.findOne({ name });
    if (user) {
      const error = new Error('이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.');
      error.name = 'Conflict';
      throw error;
    }

    // db에 저장
    const createdNewUser = await User.create(userInfo);

    return createdNewUser;
  }

  async getUsers(): Promise<UserData[]> {
    const users = await User.find({});
    return users;
  }

  async getUserDataById(_id: string): Promise<UserData> {
    const user = await User.findOne({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error('해당 id의 사용자가 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }

    return user;
  }

  async setUser(_id: string, update: Partial<UserInfo>): Promise<UserData> {
    // 업데이트 진행
    const updatedUser = await User.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedUser) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedUser;
  }

  async deleteUserData(_id: string): Promise<{ result: string }> {
    const { deletedCount } = await User.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`${_id} 사용자의 삭제에 실패하였습니다`);
      error.name = 'NotFound';
      throw error;
    }

    return { result: 'success' };
  }
}

const userService = new UserService();

export { userService };
