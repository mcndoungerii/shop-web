import axios from 'axios'
import { apiHost } from './config'
const config = {
    timeout: 60 * 2 * 1000,
    baseURL: apiHost
}
const instance = axios.create(config)

export default {

    list (url) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.get('/report/'+url)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    if (error.response && error.response.data) reject(error.response.data)
                    reject(error)
                })
        })
    },
    
    
    

}
