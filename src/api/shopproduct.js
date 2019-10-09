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
            return instance.get(`/products/`+url)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    if (error.response && error.response.data) reject(error.response.data)
                    reject(error)
                })
        })
    },
   
    addToShop (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/shopProduct', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
    deleteFromShop (data) {
        const token = localStorage.getItem('token')
        Object.assign(instance.defaults, {headers: {Authorization: token}})
        return new Promise(function (resolve, reject) {
            return instance.post('/shopProduct/delete', data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error.response.data)
                })
        })
    },
   

}
