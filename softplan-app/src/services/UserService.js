import BaseService from './BaseService';

export default class UserService extends BaseService {
  static async find() {
    return await this.execute({
      url: 'users',
      method: 'GET'
    });
  }

  static async findById(id) {
    return await this.execute({
      url: `users/${id}`,
      method: 'GET'
    });
  }

  static async save(data) {
    return await this.execute({
      url: 'users',
      method: 'POST',
      data
    });
  }

  static async delete(id) {
    return await this.execute({
      url: `users/${id}`,
      method: 'DELETE'
    });
  }

  static async update(id, data) {
    return await this.execute({
      url: `users/${id}`,
      method: 'PUT',
      data
    });
  }

}