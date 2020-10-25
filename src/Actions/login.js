import axios from 'axios'
export function login(data) {
    return dispatch => {
        return axios.post('/dashboard',data);
    }
}

