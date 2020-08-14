import * as axios from 'axios';
import BaseService from './BaseService';

export default class AuthService extends BaseService {
  static async login(data) {
    return await axios({
      url: `${process.env.REACT_APP_BASE_URL}/login`,
      method: 'POST',
      data
    });
  }

  static async forgotPassword(data) {
    return await axios({
      url: '/forgotPassword',
      method: 'POST',
      data
    });
  }

  static async updateProfile(data) {
    return await this.execute({
      url: 'usuarios',
      method: 'PUT',
      data
    });
  }
}