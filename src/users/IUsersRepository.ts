import UserModel from './UserModel';

export default interface IUsersRepository {
  getUser(email: String, password: String): Promise<UserModel>;
  registerUser(
    email: String,
    password: String,
    birthDate: Date | undefined,
    fullName: String | undefined
  ): Promise<void>;
}
