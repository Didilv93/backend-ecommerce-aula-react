import { logger } from '../config/logger';
import obterIdLog from '../shared/utils/GetIdLog';
import UserModel from './UserModel';
import IUsersBLL from './IUsersBLL';
import UsersRepository from './UsersRepository';

export default class UsersBLL implements IUsersBLL {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  registerUser(
    email: String,
    password: String,
    birthDate: Date | undefined,
    fullName: String | undefined
  ): Promise<void> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        await this.usersRepository.registerUser(email.toLowerCase(), password, birthDate, fullName);
      } catch (erro) {
        logger.error('Erro ao registrar usuário', obterIdLog(), erro);
        reject(erro);
      }
    });
  }

  getUser(email: String, password: String): Promise<UserModel> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        resolve(await this.usersRepository.getUser(email.toLowerCase(), password));
      } catch (erro) {
        logger.error('Erro ao buscar usuário', obterIdLog(), erro);
        reject(erro);
      }
    });
  }
}
