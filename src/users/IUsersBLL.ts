import UserModel from './UserModel';

export default interface IUsersBLL {
  getUser(email: String, password: String): Promise<UserModel>;
  registerUser(
    email: String,
    password: String,
    birthDate: Date | undefined,
    fullName: String | undefined
  ): Promise<void>;
}
