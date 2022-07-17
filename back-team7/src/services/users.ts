import { User } from '../models';
import { Types } from 'mongoose';
import mongodb = require('mongodb');
export interface UserInfo {
  authority: string;
  email: string;
  name: string;
  refreshToken?: string | undefined;
  profileImage?: string[] | undefined;
  contactNumber?: string | undefined;
  location?: object | undefined;
  friends?: string[] | undefined;
}

export interface UserData extends UserInfo {
  _id: string;
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

  async getUsers(): Promise<Partial<UserData>[]> {
    const users = await User.find({});
    const data = await users.map(({ _id, name, profileImage }) => ({ _id, name, profileImage }));
    return data;
  }

  async getUserDataById(_id: Types.ObjectId | string): Promise<Partial<UserData>> {
    const user = await User.findOne({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error('해당 id의 사용자가 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    const data = {
      _id: user._id,
      name: user.name,
      profileImage: user.profileImage,
    };
    return data;
  }

  async getUserDataByRefreshToken(refreshToken: string): Promise<UserData> {
    const user = await User.findOne({ refreshToken });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error('해당 token 사용자가 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }

    return user;
  }

  async setUser(_id: Types.ObjectId | string, update: Partial<UserInfo>): Promise<UserData> {
    // 업데이트 진행
    const updatedUser = await User.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedUser) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedUser;
  }

  async friendsBulkUpdate(writes: Array<mongodb.AnyBulkWriteOperation>) {
    User.bulkWrite(writes);
  }

  async deleteUserData(_id: Types.ObjectId | string): Promise<{ result: string }> {
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
