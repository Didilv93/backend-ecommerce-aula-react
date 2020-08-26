import UserModel from './UserModel';
import IUsersRepository from './IUsersRepository';

import RepositoryException from '../shared/exception/RepositoryException';
import { INSERT_ERROR, IMAGES_REPOSITORY, NUMBER_IMAGES } from '../shared/repository/constants';

('use strict');
const fs = require('fs');

export default class UsersRepository implements IUsersRepository {
  registerUser(
    email: String,
    password: String,
    birthDate: Date | undefined,
    fullName: String | undefined
  ): Promise<void> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        if (fs.existsSync(`./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`)) {
          await fs.readFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            'utf8',
            function readFileCallback(err, data) {
              if (err) throw err;
              const users = JSON.parse(data);
              const user = users.find((item: any) => item.email === email);
              if (user && user.email) throw 'Usuário já registrado';
              users.push({
                id: users.length + 1,
                email,
                password,
                birthDate,
                fullName,
                userPhoto: `${IMAGES_REPOSITORY}/${users.length % NUMBER_IMAGES}.jpg`,
                notifications: ['Bem vinda!! :)'],
              });
              const json = JSON.stringify(users);
              fs.writeFile(
                `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
                json,
                'utf8',
                (err: any) => {
                  throw err;
                }
              );
            }
          );
        } else {
          const json = JSON.stringify([{ email, password, birthDate, fullName }]);
          fs.writeFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            json,
            'utf8',
            (err: any) => {
              throw err;
            }
          );
        }
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro ao registrar usuário'),
            error
          )
        );
      }
    });
  }

  getUser(email: String, password: String): Promise<any> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        if (fs.existsSync(`./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`)) {
          await fs.readFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            'utf8',
            (err, data) => {
              if (err) throw err;

              const users = JSON.parse(data);
              const user: UserModel = users.find(
                (item: any) => item.email === email && item.password === password
              );
              if (!user) throw 'Usuário não encontrado';
              resolve({
                email,
                id: user.id,
                fullName: user.fullName,
                birthDate: user.birthDate,
                userPhoto: user.userPhoto,
                notifications: user.notifications,
              });
            }
          );
        } else {
          throw 'Usuário não encontrado';
        }
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro ao buscar usuário'),
            error
          )
        );
      }
    });
  }
}
