import * as axios from 'axios';
import { stateRoot } from '../store';

export default class BaseService {
    static async execute({ url, method, data = {}, useToken = true}) {
        const options = {
            url: `${process.env.REACT_APP_BASE_URL}/${url}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
        if (useToken) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${stateRoot().auth.token}`,
            }
        }
        return await axios(options);
    }

}