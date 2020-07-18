import { Request, Response } from 'express';

import UsersBLL from './UsersBLL';
import UsersRepository from './UsersRepository';
import UserModel from './UserModel';
import BaseController from '../shared/controllers/BaseController';
import ControllerException from '../shared/exception/ControllerException';
import { INVALID_URL } from '../shared/controllers/constants';

export default class Controller extends BaseController {
  constructor() {
    super();
  }

  paramsValidate(params: any): void {
    if (!params.email) {
      throw new ControllerException(INVALID_URL.code, INVALID_URL.message);
    }
    if (!params.password) {
      throw new ControllerException(INVALID_URL.code, INVALID_URL.message);
    }
  }

  getLib(): UsersBLL {
    return new UsersBLL(new UsersRepository());
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const {
        body: { params },
      } = req;
      const usersBLL = this.getLib();
      this.paramsValidate(params);
      const user: UserModel = await usersBLL.getUser(params.email, params.password);
      if (!user) res.status(404).json(user);
      return res.status(200).json(user);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };

  registerUser = async (req: Request, res: Response) => {
    try {
      const {
        body: { params },
      } = req;
      const usersBLL = this.getLib();
      this.paramsValidate(params);
      await usersBLL.registerUser(params.email, params.password, params.birthDate, params.fullName);
      return res.status(200);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };
}
