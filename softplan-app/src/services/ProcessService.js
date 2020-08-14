import BaseService from './BaseService';

export default class ProcessService extends BaseService {
  static async find() {
    return await this.execute({
      url: 'processes',
      method: 'GET'
    });
  }

  static async findById(id) {
    return await this.execute({
      url: `processes/${id}`,
      method: 'GET'
    });
  }

  static async save(data) {
    return await this.execute({
      url: 'processes',
      method: 'POST',
      data
    });
  }

  static async delete(id) {
    return await this.execute({
      url: `processes/${id}`,
      method: 'DELETE'
    });
  }

  static async update(id, data) {
    return await this.execute({
      url: `processes/${id}`,
      method: 'PUT',
      data
    });
  }

}