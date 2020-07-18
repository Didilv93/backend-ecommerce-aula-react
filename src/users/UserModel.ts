export default class UserModel {
  public email: string;
  public fullName: string | undefined;
  public birthDate: Date | undefined;
  public userPhoto: string | undefined;

  constructor(user: UserModel = {} as UserModel) {
    const {
      email = undefined,
      birthDate = undefined,
      fullName = undefined,
      userPhoto = undefined,
    } = user;

    this.email = email;
    this.birthDate = birthDate;
    this.fullName = fullName;
    this.userPhoto = userPhoto;
  }
}
